import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Control, useController } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { View } from './View';
import { Text } from './Text';
import { Button } from './Button';
import { getMessageError } from '@utils/common.util';
import { convertUTCDate, convertUTCDay } from '@utils/date.util';
import { Image } from './Image';
import { images } from '@assets/images';

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
  editable?: boolean;
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
    editable = true,
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
        <View className='flex-row'>
          <Text className={'text-blueLight3'}>{label || 'Timestamp'}</Text>
          {required && <Text className='text-red ml-1 text-[16px]'>*</Text>}
        </View>
      }
      <Button
        onPress={onClickPicker}
        disabled={!editable}
        className={`flex-row items-center gap-x-3 bg-white px-3 border border-border mt-[6] h-[54]  rounded ${className}`}
      >
        <Image source={images.success} className='w-5 h-5' />
        {placeholder && !field.value ? (
          <Text className="text-[14px] sm:text-[16px]  text-gray">{placeholder}</Text>
        ) : (
          <Text
            className={`text-[14px] sm:text-[16px] text-blueBold  ${classNameText} ${isTextCenter && 'text-center'}`}
            numberOfLines={1}
          >
            {customDisplayValue ? customDisplayValue : renderDefault()}
          </Text>
        )}
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
