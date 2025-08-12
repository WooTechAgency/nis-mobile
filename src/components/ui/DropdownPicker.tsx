
import { isIpad } from '@constants/app.constants';
import React, { memo, useEffect, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import DropDownPickerComponent, { DropDownDirectionType } from 'react-native-dropdown-picker';
import { Text } from './Text';
import { getMessageError } from '@utils/common.util';

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
        {!!label &&
          <View className='flex-row items-center justify-between'>
            <View className='flex-row'>
              <Text className={`text-blueLight3  ${labelCls}`}>{label}</Text>
              {required && <Text className='text-red ml-1 text-[16px]'>*</Text>}
            </View>
          </View>
        }
        <DropDownPickerComponent
          disabled={disabled}
          onPress={() => Keyboard.dismiss()}
          open={open}
          items={[...(listValue || [])]}
          setOpen={setOpen}
          value={displayValue}
          setValue={setDisplayValue}
          onSelectItem={onSelectItem}
          placeholder={placeholder}
          dropDownDirection={dropDownDirection || 'AUTO'}
          placeholderStyle={{
            color: '#7C8DA6',
            fontSize: isIpad ? 16 : 14,
          }}
          disableBorderRadius={false}
          style={{
            zIndex: 50,
            backgroundColor: 'white',
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: '#D9D9D9',
            height: isIpad ? 64 : 50,
            borderRadius: 4,
            marginTop: 6,
          }}
          labelStyle={{
            color: '#042659',
            fontSize: isIpad ? 16 : 14,
          }}
          listParentContainerStyle={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
          }}
          listItemLabelStyle={{
            color: '#042659',
            fontSize: isIpad ? 16 : 14,
            borderColor: 'white',
          }}
          dropDownContainerStyle={{
            borderColor: '#D9D9D9',
            marginTop: 10,
            backgroundColor: 'white',
            // shadow
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: { width: -2, height: 4 },
            shadowColor: 'rgba(0, 0, 50, 0.2)',
            overflow: 'visible',
          }}
          arrowIconStyle={{ tintColor: '#042659' }}
          tickIconStyle={{ tintColor: '#042659' }}
          selectedItemLabelStyle={{
            fontWeight: '600',
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
