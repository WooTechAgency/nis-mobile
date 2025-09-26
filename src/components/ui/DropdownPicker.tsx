
import { isIpad } from '@constants/app.constants';
import React, { memo, useEffect, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import DropDownPickerComponent, { DropDownDirectionType } from 'react-native-dropdown-picker';
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
  dropDownDirection?: DropDownDirectionType
  disabled?: boolean;
  onSelectCallback?: (item: IDropdown | any) => void
}

export const DropdownPicker = memo((props: Props) => {
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
    dropDownDirection,
    disabled,
    onSelectCallback
  } = props;
  const selectedItem = useWatch({ name, control });
  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(selectedItem?.value);
  const messageError = getMessageError(errors, name);

  useEffect(() => {
    DropDownPickerComponent.setListMode('SCROLLVIEW');
  }, []);

  useEffect(() => {
    if (isRerender) {
      setDisplayValue(selectedItem?.value);
    }
  }, [selectedItem?.value, isRerender]);

  const onSelectItem = (item: IDropdown) => {
    setOpen(false)
    setDisplayValue(item.value)
    onSelectCallback?.(item)
    // fix bug doesn't hide error
    setTimeout(() => {
      setValue(name, item, { shouldValidate: true, shouldDirty: true });
    }, 0)
  };

  return (
    <View className={`z-50 ${classNameWrap}`}>
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
        <DropDownPickerComponent
          disabled={disabled}
          onPress={() => Keyboard.dismiss()}
          open={open}
          containerStyle={{ zIndex: 1 }}
          items={[...(listValue || [])]}
          setOpen={setOpen}
          value={displayValue}
          setValue={setDisplayValue}
          onSelectItem={onSelectItem}
          placeholder={placeholder}
          dropDownDirection={dropDownDirection || 'AUTO'}
          placeholderStyle={{
            color: messageError ? colors.red : colors.gray,
            fontSize: isIpad ? 16 : 14,
          }}
          disableBorderRadius={false}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: messageError ? colors.red : disabled ? colors.neutral20 : colors.border,
            height: 56,
            borderRadius: 14,
          }} Date
          labelStyle={{
            color: disabled ? colors.neutral40 : colors.black,
            fontSize: isIpad ? 16 : 14,
          }}
          listParentContainerStyle={{
            borderWidth: 1,
            borderColor: colors.border,
          }}
          listItemLabelStyle={{
            color: colors.black,
            fontSize: isIpad ? 16 : 14,
            borderColor: 'white',
          }}
          dropDownContainerStyle={{
            borderColor: colors.border,
            marginVertical: 8,
            backgroundColor: 'white',
            // shadow
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: { width: -2, height: 4 },
            shadowColor: 'rgba(0, 0, 50, 0.2)',
            overflow: 'visible',
          }}
          arrowIconStyle={{ tintColor: colors.neutral70 }}
          tickIconStyle={{ tintColor: colors.black }}
          selectedItemLabelStyle={{
            fontWeight: '600',
            color: colors.black
          }}
          listMessageTextStyle={{
            color: '#042659',
            fontSize: isIpad ? 16 : 14,
          }}
        />
        {messageError && <Text className="text-red mt-[6] text-[11px]">{messageError}</Text>}
      </>
    </View>
  );
});
