import { images } from '@assets/images';
import { isAndroid, isIOS, isIpad } from '@constants/app.constants';
import { useLLM } from '@hooks/useLLM';
import { useVoice } from '@hooks/useVoice';
import { getMessageError } from '@utils/common.util';
import { formatSecondsToMMSS } from '@utils/date.util';
import { useLLMContext } from '@zustand/useLLMContext';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useController, useWatch } from 'react-hook-form';
import { StyleProp, TextInput as TextInputComponent, TextInputProps, TextStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
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
  styleLabel?: StyleProp<TextStyle>
  formatPhone?: boolean
  formatName?: boolean
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
    labelOverlap = true,
    hasVoice,
    classNameInput,
    setValue,
    styleLabel,
    formatPhone,
    formatName
  } = props;
  const { field } = useController({ control: control, name: name });
  const messageError = getMessageError(errors, name);
  const [promptLoading, setPromptLoading] = useState(false);
  const value = useWatch({ control, name });
  const [oldValue, setOldValue] = useState(value);
  const lastRecognizedTextRef = useRef('');
  const { llmContext } = useLLMContext()
  const { askModel } = useLLM()
  const { startVoice, stopVoice, recognizedText, isListening, seconds, pauseVoice, resumeVoice, isStopped, isAnyVoiceActive } = useVoice(name)

  const formatPhoneInput = (text: string) => {
    // Remove any characters that are not numbers or +
    let formatted = text.replace(/[^0-9+]/g, '');
    // Ensure only one + symbol and it's at the beginning
    const plusCount = (formatted.match(/\+/g) || []).length;
    if (plusCount > 1) {
      // Keep only the first + and remove others
      formatted = '+' + formatted.replace(/\+/g, '');
    } else if (plusCount === 1 && !formatted.startsWith('+')) {
      // Move + to the beginning if it's not already there
      formatted = '+' + formatted.replace(/\+/g, '');
    }
    return formatted;
  };

  const formatNameInput = (text: string) => {
    // Remove any characters that are not alphabetic or spaces
    let formatted = text.replace(/[^a-zA-Z\s]/g, '');
    // Remove multiple consecutive spaces and replace with single space
    formatted = formatted.replace(/\s+/g, ' ');
    return formatted;
  };

  const resetInput = () => {
    setValue && setValue(name, '');
  };

  const onUseVoice = () => {
    startVoice()
    setOldValue(value)
    lastRecognizedTextRef.current = ''; // Reset ref when starting new voice session
  }

  const onEnhanceAI = async () => {
    try {
      setPromptLoading(true);
      const result = await askModel(value?.trim())
      setValue && setValue(name, result?.trim() || '', { shouldValidate: true })
    }
    finally {
      setPromptLoading(false);
    }
  }

  useEffect(() => {
    if (recognizedText && setValue && recognizedText !== lastRecognizedTextRef.current) {
      lastRecognizedTextRef.current = recognizedText;
      setValue(name, `${oldValue || ''} ${recognizedText}`.trim(), { shouldValidate: true })
    }
  }, [name, oldValue, recognizedText, setValue])

  return (
    <View className={`${classNameWrap}`}>
      {label &&
        <Text className={`text-[12px]  px-1 mb-1
        ${labelOverlap && 'absolute left-4 -top-2 bg-white z-10'} 
        ${disabled ? 'text-border' : 'text-neutral70'} 
        ${labelCls}
        ${messageError && 'text-red'}
        `}
          style={styleLabel}
        >
          {label}
        </Text>
      }
      <View className=''>
        <TextInputComponent
          value={field.value}
          autoCorrect={false}
          autoComplete='off'
          onChangeText={(text) => {
            if (formatPhone) {
              const formatted = formatPhoneInput(text);
              field.onChange(formatted);
            } else if (formatName) {
              const formatted = formatNameInput(text);
              field.onChange(formatted);
            } else {
              field.onChange(text);
            }
          }}
          onBlur={field.onBlur}
          placeholder={placeholder || ''}
          autoCapitalize={name?.toLowerCase().includes('email') ? 'none' : autoCapitalize}
          placeholderTextColor={disabled ? '#BEBEBE' : messageError ? '#E80000' : '#666666'}
          editable={!disabled && !isListening && !promptLoading}
          multiline={multiline}
          style={isAndroid && multiline && { textAlignVertical: 'top' }}
          {...props}
          className={`text-black border font-regular px-4 py-0 rounded-[14px] text-[16px] border-border w-full
           ${multiline ? 'h-[208px] sm:h-[144px] py-4' : 'h-[56]'}
            ${isAndroid && 'pt-1'}
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
        {isIOS && hasVoice && setValue &&
          <View className='flex-row mt-2 gap-x-4 absolute right-4 bottom-4 z-50 bg-white'>
            {isStopped
              ?
              <Button
                className={`flex-row  w-[48px] sm:w-[135] h-[36] border border-primary center  gap-x-2 rounded-[8px] ${isAnyVoiceActive ? 'opacity-50' : ''}`}
                onPress={onUseVoice}
                disabled={isAnyVoiceActive}
              >
                <Image source={images.voice} className='w-8 h-8' />
                {isIpad && <Text className='text-[12px] font-medium '>Use Voice</Text>}
              </Button>
              :
              <View className='row-center border border-primary rounded-[8px] p-2 h-[36px]'>
                <Image source={images.voice} className='w-8 h-8' />
                <Text className='text-sm font-medium'>{formatSecondsToMMSS(seconds)}</Text>
                <View className='w-[50px] sm:w-[125px] h-[1px] bg-neutral40 mx-[10px]' />
                <Image source={images.trash}
                  className='w-8 h-8'
                  onPress={() => {
                    stopVoice()
                    setValue && setValue(name, value?.replace(recognizedText, '') || '');
                  }}
                />
                <View className='w-[1px] h-4 bg-neutral40 mx-1' />
                <Image
                  source={isListening ? images.pauseActive : images.pauseInactive}
                  className='w-8 h-8'
                  onPress={() => {
                    if (isListening) {
                      setOldValue(value)
                    }
                    isListening ? pauseVoice() : resumeVoice()
                  }}
                />
                <Image source={images.done} className='w-8 h-8' onPress={stopVoice} />
              </View>
            }
            <Button
              className='flex-row w-[48px] sm:w-[135] h-[36] border border-primary center  gap-x-2 rounded-[8px] disabled:opacity-50'
              onPress={onEnhanceAI}
              disabled={isListening || !llmContext || !value?.trim()}
            >
              {promptLoading ? <ActivityIndicator size={'small'} /> : <Image source={images.ai} className='w-8 h-8' />}
              {isIpad && <Text className='text-[12px] font-medium '>AI enhance</Text>}
            </Button>
          </View>
        }

      </View>
      {isShowError && messageError && <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>}
    </View>
  );
}
