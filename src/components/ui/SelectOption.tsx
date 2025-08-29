import { getMessageError } from '@utils/common.util';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { Text, Button } from '@components/ui';


interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  errors?: FieldErrors;
  options: any[];
}

// const options = [
//   { key: 'low', title: 'Low', bg: '#EAECF0', color: 'black' },
//   { key: 'medium', title: 'Medium', bg: '#C7CAD0', color: 'black' },
//   { key: 'high', title: 'High', bg: '#667085', color: 'white' },
// ];

export function SelectOption(props: Props) {
  const { setValue, name, control, label, labelCls, options, classNameWrap, errors, } = props;
  const value = useWatch({
    name,
    control,
  });

  const messageError = getMessageError(errors, name);

  const onSelect = (option: any) => {
    setValue(name, option, { shouldValidate: true });
  };

  return (
    <View className={` ${classNameWrap}`}>
      {label && <Text className={`text-[12px] px-1 mb-2 ${labelCls}`}>{label}</Text>}
      <View className='flex-row items-center gap-x-2.5'>
        {options.map((option, index) =>
          <Button
            onPress={() => onSelect(option)}
            key={index}
            style={{ backgroundColor: option.bg }}
            className={`flex-1 h-[48px] bg-teal20 rounded-[14px] justify-center items-center ${value && value.title !== option.title && 'opacity-50'}`}
          >
            <Text className='font-medium'>{option.title}</Text>
          </Button>
        )}
      </View>
      {messageError && <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>}
    </View>
  );
}