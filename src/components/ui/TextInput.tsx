import { images } from '@assets/images';
import { isAndroid } from '@constants/app.constants';
import { getMessageError } from '@utils/common.util';
import React, { ReactNode } from 'react';
import { Control, FieldErrors, UseFormSetValue, useController } from 'react-hook-form';
import { TextInput as TextInputComponent, TextInputProps } from 'react-native';
import { Button } from './Button';
import { Image } from './Image';
import { Text } from './Text';
import { View } from './View';
interface Props extends TextInputProps {
  label?: string;
  labelCls?: string;
  placeholder?: string;
  inputCls?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  classNameInput?: string;
  classNameWrap?: string;
  name: string;
  control?: Control<any, any>;
  errors?: FieldErrors;
  disabled?: boolean;
  tip?: ReactNode;
  multiline?: boolean;
  isShowError?: boolean;
  isShowClose?: boolean;
  labelOverlap?: boolean;
  setValue?: UseFormSetValue<any>;
  hasVoice?: boolean
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
    iconLeft,
    iconRight,
    multiline,
    autoCapitalize,
    isShowError = true,
    isShowClose,
    labelOverlap,
    hasVoice,
    classNameInput,
    setValue
  } = props;
  const { field } = useController({ control: control, name: name });
  const messageError = getMessageError(errors, name);

  const resetInput = () => {
    setValue && setValue(name, '');
  };

  const onUseVoice = () => { }

  const onEnhanceAI = () => {
    //   const prompt = `Viết lại câu sau bằng tiếng Việt có dấu câu đầy đủ, tự nhiên và lịch sự:\n\n"${rawText}"\n\nChỉ trả về câu đã chỉnh sửa.`;
    // const res = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${openAiKey}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: prompt }],
    //     temperature: 0.2,
    //     max_tokens: 100,
    //   }),
    // });
    // const data = await res.json();
    // return data?.choices?.[0]?.message?.content?.trim();
  }

  console.log('classNameInput ', classNameInput)

  return (
    <View className={`${classNameWrap}`}>
      {label &&
        <Text className={`text-[12px] text-neutral70 px-1 mb-1
        ${labelOverlap && 'absolute left-4 -top-2 bg-white z-10'} 
        ${disabled && 'text-neutral40'} 
        ${labelCls}
        ${messageError && 'text-red'}
     
        `}
        >
          {label}
        </Text>
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
          placeholderTextColor={disabled ? '#BEBEBE' : messageError ? '#E80000' : '#666666'}
          editable={!disabled}
          multiline={multiline}
          style={isAndroid && multiline && { textAlignVertical: 'top' }}
          {...props}
          className={`text-black h-[56] border font-regular px-4 py-0 rounded-[14px] text-[16px] border-border w-full
           ${multiline && 'h-[112] sm:h-[144] py-4'}
            ${disabled && 'text-neutral40 border-neutral20'} 
            ${iconRight || isShowClose && 'pr-10'} 
            ${className}
            ${classNameInput}
            ${messageError && 'border-red text-red'}`
          }
        />
        {iconLeft && iconLeft}
        {iconRight && iconRight}
        {isShowClose && field.value && <Image onPress={resetInput} source={images.close} className='w-12 h-12 ' classNameButton='absolute right-1 top-1' />}
      </View>
      {isShowError && messageError && <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>}
      {hasVoice &&
        <View className='flex-row mt-2 gap-x-4'>
          <Button
            className='flex-row items-center p-2.5 bg-primary gap-x-2 rounded-[8px] '
            onPress={onUseVoice}
          >
            <Image source={images.success} className='w-5 h-5' />
            <Text className='text-[12px] font-medium text-white'>Use Voice</Text>
          </Button>
          <Button
            className='flex-row items-center p-2.5 bg-violet gap-x-2 rounded-[8px] '
            onPress={onEnhanceAI}
          >
            <Image source={images.success} className='w-5 h-5' />
            <Text className='text-[12px] font-medium text-white'>AI enhance</Text>
          </Button>
        </View>
      }
    </View>
  );
}
