import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Control, useController } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { View } from './View';
import { Text } from './Text';
import { Button } from './Button';
import { getMessageError } from '@utils/common.util';
import { convertHHMM, convertUTCDate, convertUTCDay } from '@utils/date.util';
import { Image } from './Image';
import { images } from '@assets/images';
import { colors } from '@constants/colors.constants';

interface Props {
  label?: string;
  wrapCls?: string;
  setValue?: UseFormSetValue<any>;
  name: string;
  mode?: 'date' | 'time' | 'datetime';
  renderMode?: 'dob' | null;
  control?: Control<any, any>;
  customDisplayValue?: string;
  className?: string;
  classNameText?: string;
  placeholder?: string;
  errors?: FieldErrors;
  isTextCenter?: boolean;
  notCheckMaxDate?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function DatePickerInput(props: Props) {
  const {
    wrapCls,
    setValue,
    name,
    mode,
    renderMode,
    label,
    control,
    customDisplayValue,
    className,
    classNameText,
    placeholder,
    errors,
    isTextCenter,
    notCheckMaxDate = false,
    required,
    disabled
  } = props;
  const { field } = useController({
    control,
    name,
  });
  const messageError = getMessageError(errors, name);

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onConfirm = (value: Date) => {
    toggleOpen();
    if (setValue && name) {
      setValue(name, value, { shouldValidate: true, shouldDirty: true });
    }
  };

  const renderDefault = () => {
    const type = renderMode || mode;
    switch (type) {
      case 'date':
        return convertUTCDate(field.value)
      case 'time':
        return convertHHMM(field.value)
      default:
        return convertUTCDay(field.value);
    }
  };

  const onClickPicker = () => {
    Keyboard.dismiss()
    toggleOpen()
  }

  return (
    <View className={wrapCls}>
      {label &&
        <Text className={`text-[12px]  px-1 mb-1 -top-2 absolute left-4 z-10 bg-white 
        ${disabled ? 'text-border' : 'text-neutral70'} 
        ${messageError && 'text-red'}
        `}>
          {label}
        </Text>
      }
      <Button
        onPress={onClickPicker}
        disabled={disabled}
        className={`flex-row items-center gap-x-3 bg-white rounded-[14px] border  h-[54] px-4
         ${messageError ? 'border-red' : 'border-border'}
          ${className}`}
      >
        {placeholder && !field.value ? (
          <Text className={`sm:text-[16px]  ${messageError ? 'text-red' : 'text-gray'}`}>{placeholder}</Text>
        ) : (
          <Text
            className={`sm:text-[16px]  ${disabled && 'text-neutral50'} ${classNameText} ${isTextCenter && 'text-center'}`}
            numberOfLines={1}
          >
            {customDisplayValue ? customDisplayValue : renderDefault()}
          </Text>
        )}
        <View className='flex-1' />
        <Image
          source={images.date}
          className='w-4 h-4'
          tintColor={disabled ? colors.border :
            messageError ? colors.red : colors.gray}
        />
      </Button>
      <DatePicker
        open={open}
        date={field.value ? new Date(field.value) : new Date()}
        modal
        mode={mode || 'date'}
        onConfirm={onConfirm}
        onCancel={toggleOpen}
        maximumDate={mode === 'time' || notCheckMaxDate ? undefined : new Date()}
      />
      {messageError && <Text className="text-red mt-[6] text-[11px]">{messageError}</Text>}
    </View>
  );
}
