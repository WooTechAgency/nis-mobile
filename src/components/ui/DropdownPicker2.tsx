import { isIpad } from '@constants/app.constants';
import React, { memo, useEffect, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text } from './Text';
import { getMessageError } from '@utils/common.util';
import { colors } from '@constants/colors.constants';
import { IDropdown } from '@constants/interface';

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  listValue: IDropdown[] | undefined;
  placeholder?: string;
  errors?: FieldErrors;
  isRerender?: boolean;
  required?: boolean;
  disabled?: boolean;
  onSelectCallback?: (item: IDropdown | any) => void
}

export const DropdownPicker2 = memo((props: Props) => {
  const {
    setValue,
    name,
    control,
    label,
    labelCls,
    classNameWrap,
    listValue,
    placeholder,
    errors,
    isRerender,
    disabled,
    onSelectCallback
  } = props;

  const selectedItem = useWatch({ name, control });
  const [value, setValueState] = useState(selectedItem?.value);
  const messageError = getMessageError(errors, name);

  useEffect(() => {
    if (isRerender) {
      setValueState(selectedItem?.value);
    }
  }, [selectedItem?.value, isRerender]);

  const handleChange = (item: IDropdown) => {
    setValueState(item.value);
    onSelectCallback?.(item);
    // fix bug doesn't hide error
    setTimeout(() => {
      setValue(name, item, { shouldValidate: true, shouldDirty: true });
    }, 0);
  };

  return (
    <View className={`z-40 ${classNameWrap}`}>
      <>
        {label &&
          <Text className={`text-[12px] px-1 bg-white -top-2 absolute left-4 z-10
            ${disabled ? 'text-neutral40' : 'text-neutral70'} 
            ${labelCls}
            ${messageError && 'text-red'}
            `}
          >
            {label}
          </Text>
        }
        <Dropdown
          disable={disabled}
          data={listValue || []}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => Keyboard.dismiss()}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: messageError ? colors.red : disabled ? colors.neutral20 : colors.border,
            height: 56,
            borderRadius: 14,
          }}
          placeholderStyle={{
            color: messageError ? colors.red : colors.gray,
            fontSize: isIpad ? 16 : 14,
          }}
          selectedTextStyle={{
            color: disabled ? colors.neutral40 : colors.black,
            fontSize: isIpad ? 16 : 14,
          }}
          containerStyle={{
            borderColor: colors.border,
            marginVertical: 8,
            backgroundColor: 'white',
            borderRadius: 14,
            // shadow
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: { width: -2, height: 4 },
            shadowColor: 'rgba(0, 0, 50, 0.2)',
            elevation: 5,
          }}
          itemTextStyle={{
            color: colors.black,
            fontSize: isIpad ? 16 : 14,
          }}
          activeColor={colors.neutral10}
          iconStyle={{
            tintColor: colors.neutral70,
          }}
          maxHeight={300}
          renderRightIcon={() => (
            <View style={{
              width: 0,
              height: 0,
              borderLeftWidth: 6,
              borderRightWidth: 6,
              borderTopWidth: 6,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: colors.neutral70,
            }} />
          )}
        />
        {messageError && <Text className="text-red mt-[6] text-[11px]">{messageError}</Text>}
      </>
    </View>
  );
});