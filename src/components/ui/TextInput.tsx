import { TextInput as TextInputComponent, TextInputProps } from 'react-native';
import React, { ReactNode, useState } from 'react';
import { View } from './View';
import { Text } from './Text';
import { Control, FieldErrors, UseFormSetValue, useController } from 'react-hook-form';
import { isAndroid } from '@constants/app.constants';
import { getMessageError } from '@utils/common';
import { Image } from './Image';
import { images } from '@assets/images';

interface Props extends TextInputProps {
  label?: string;
  labelCls?: string;
  placeholder?: string;
  inputCls?: string;
  iconRight?: ReactNode;
  className?: string;
  classNameWrap?: string;
  name: string;
  control?: Control<any, any>;
  errors?: FieldErrors;
  disabled?: boolean;
  tip?: ReactNode;
  multiline?: boolean;
  isShowError?: boolean;
  isShowClose?: boolean;
  setValue?: UseFormSetValue<any>;

}

export function TextInput(props: Props) {
  const {
    label,
    labelCls,
    placeholder,
    control,
    name,
    classNameWrap,
    className,
    errors,
    disabled,
    iconRight,
    multiline,
    autoCapitalize,
    isShowError = true,
    isShowClose = false,
    setValue
  } = props;
  const { field } = useController({ control: control, name: name });
  const messageError = getMessageError(errors, name);

  const resetInput = () => {
    setValue && setValue(name, '');
  };

  return (
    <View className={`${classNameWrap}`}>
      {label &&
        <View className='absolute left-3 top-[-8] bg-white z-50'>
          <Text className={`text-[12px] px-1 text-gray ${labelCls} ${messageError && 'text-red'}`}>{label}</Text>
        </View>
      }
      <View className=''>
        <TextInputComponent
          value={field.value}
          autoCorrect={false}
          autoComplete='off'
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          placeholder={placeholder || ''}
          autoCapitalize={name?.toLowerCase().includes('email') ? 'none' : autoCapitalize}
          className={`text-black h-[56] border font-regular px-4 py-0 rounded-lg text-[16px] border-border  w-full ${multiline && 'h-[112] sm:h-[144] py-4'
            } ${disabled && 'text-neutral40'} ${iconRight || isShowClose && 'pr-10'} ${className} ${messageError && 'border-red text-red'}`}
          placeholderTextColor={disabled ? '#BEBEBE' : messageError ? '#E80000' : '#666666'}
          editable={!disabled}
          multiline={multiline}
          style={isAndroid && multiline && { textAlignVertical: 'top' }}
          {...props}
        />
        {iconRight && iconRight}
        {isShowClose && field.value && <Image onPress={resetInput} source={images.close} className='w-12 h-12 ' classNameButton='absolute right-1 top-1' />}

      </View>
      {isShowError && messageError && <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>}
    </View>
  );
}
