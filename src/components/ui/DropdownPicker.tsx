
import { isIpad } from '@constants/app.constants';
import React, { memo, useEffect, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import DropDownPickerComponent, { DropDownDirectionType } from 'react-native-dropdown-picker';
import { Text } from './Text';
import { getMessageError } from '@utils/common.util';
import { colors } from '@constants/colors.constants';

export type DropDownType = {
  value: string | number;
  label: string;
}
interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  listValue: DropDownType[] | undefined;
  placeholder?: string;
  isShouldValidate?: boolean;
  errors?: FieldErrors;
  isRerender?: boolean;
  required?: boolean;
  dropDownDirection?: DropDownDirectionType
  disabled?: boolean
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
    isShouldValidate = true,
    isRerender,
    required,
    dropDownDirection,
    disabled
  } = props;
  const selectedItem = useWatch({ name, control });
  const [isShowError, setIsShowError] = useState(true);
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


  const onSelectItem = (item: DropDownType) => {
    setValue(name, item, { shouldValidate: true, shouldDirty: true });
    setOpen(false)
    setDisplayValue(item.value)
  };

  return (
    <View className={`z-50 ${classNameWrap}`}>
      <>
        {label &&
          <Text className={`text-[12px] text-neutral70 px-1 mb-1 -top-2 absolute left-4 z-10 bg-white 
        ${disabled && 'text-neutral40'} 
        ${labelCls}
        ${messageError && 'text-red'}
        `}>
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
            color: colors.gray,
            fontSize: isIpad ? 16 : 14,
          }}
          disableBorderRadius={false}
          style={{
            zIndex: 10,
            backgroundColor: 'white',
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: colors.border,
            height: 56,
            borderRadius: 14,
          }} Date
          labelStyle={{
            color: colors.black,
            fontSize: isIpad ? 16 : 14,
          }}
          listParentContainerStyle={{
            borderWidth: 1,
            borderColor: colors.border,
          }}
          listItemLabelStyle={{
            color: colors.gray,
            fontSize: isIpad ? 16 : 14,
            borderColor: 'white',
          }}
          dropDownContainerStyle={{
            borderColor: colors.border,
            marginTop: 10,
            backgroundColor: 'white',
            // shadow
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: { width: -2, height: 4 },
            shadowColor: 'rgba(0, 0, 50, 0.2)',
            overflow: 'visible',
          }}
          arrowIconStyle={{ tintColor: colors.gray }}
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
        {isShowError && messageError && <Text className="text-red mt-[6] text-[11px]">{messageError}</Text>}
      </>
    </View>
  );
});
