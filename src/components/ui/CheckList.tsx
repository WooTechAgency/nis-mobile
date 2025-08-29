import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import { getMessageError } from '@utils/common.util';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';


interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  classNameWrap?: string;
  errors?: FieldErrors;
  listValue: any[];
}

export function CheckList(props: Props) {
  const { setValue, name, control, listValue, classNameWrap, errors } = props;
  const selectedList: string[] = useWatch({ name, control }) || []

  const messageError = getMessageError(errors, name);

  const onSelect = (option: any) => {
    let newList: string[] = [];
    if (selectedList.some((item) => item === option.title)) {
      // unselect
      newList = selectedList.filter((item) => item !== option.title);
    } else {
      // add
      newList = [...selectedList, option.title];
    }
    setValue(name, newList, { shouldValidate: true });
  };

  return (
    <View className={` ${classNameWrap}`}>
      <View className='gap-y-2'>
        {listValue.map((option, index) => {
          const selected = selectedList.some((item) => item === option.title)
          return (
            <Button
              onPress={() => onSelect(option)}
              key={index}
              className={`flex-row items-center gap-x-2 h-[56px] border border-border px-4 rounded-[12px]`}
            >
              <Image source={selected ? images.checked : images.checkbox} className='w-10 h-10' />
              <Text className='' >{option.title}</Text>
            </Button>
          )
        })}
      </View>
      {messageError &&
        <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>
      }
    </View>
  );
}