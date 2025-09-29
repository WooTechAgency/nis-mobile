import { Button, Text } from '@components/ui';
import { getMessageError } from '@utils/common.util';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { riskRating } from '@screens/main/daily-assessment/config.assessment';


interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  classNameWrap?: string;
  errors?: FieldErrors;
}

export function SelectRiskRating(props: Props) {
  const { setValue, name, control, classNameWrap, errors, } = props;
  const messageError = getMessageError(errors, name);

  const value = useWatch({
    name,
    control,
  });

  const onSelect = (option: any) => {
    setValue(name, option, { shouldValidate: true });
  };

  return (
    <View className={`gap-y-4 ${classNameWrap}`}>
      <Text className='font-semibold'>Residual Risk Rating</Text>
      <Text className='text-neutral70'>Select the relevant Residual Risk rating from the table below.</Text>
      <View className='border border-border rounded-[14px] p-6 gap-4'>
        <Text className='text-[12px] font-bold text-center'>Likelihood</Text>
        <Text className='absolute top-[165px] -left-4 text-xs font-bold' style={{ transform: [{ rotate: '-90deg' }] }}>
          Consequence
        </Text>
        <View className='gap-4 ml-[120px] '>
          <View className='absolute -left-[86px] flex flex-col justify-evenly h-full gap-4'>
            {
              ['', 'Catastrophic', 'Major', 'Moderate', 'Minor'].map((item, index) => (
                <View className={`justify-center ${index === 0 ? 'mt-2' : ' h-[48px] '}`} key={index}>
                  <Text className={`text-xs font-medium `}>{item}</Text>
                </View>
              ))
            }
          </View>
          {riskRating.map((rows, index) => {
            // header
            if (index === 0) {
              return (
                <View className='flex-row items-center ' key={index}>
                  {
                    rows.map((option) => (
                      <View className='flex-1' key={option.title}>
                        <Text className={`font-medium text-center`}>{option.title}</Text>
                      </View>
                    ))
                  }
                </View>
              )
            }
            return (
              <View className='flex-row items-center gap-4' key={index}>
                {
                  rows.map((option) => (
                    <Button
                      onPress={() => onSelect(option)}
                      key={option.title}
                      style={{ backgroundColor: option.bg }}
                      className={`flex-1 h-[48px] bg-teal20 rounded-[14px] justify-center items-center ${value && value.title !== option.title && 'opacity-50'}`}
                    >
                      <Text className='font-medium'>{option.title}</Text>
                    </Button>
                  ))
                }
              </View>
            )
          })}
        </View>
      </View>
      {messageError && <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>}
    </View>
  );
}