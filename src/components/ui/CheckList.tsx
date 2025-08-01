import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import { getMessageError } from '@utils/common';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';


interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  classNameWrap?: string;
  errors?: FieldErrors;
  listValue?: any[];
}

export const checkListTemp = [
  { key: 'low', title: 'Site Induction completed by all personnel', },
  { key: 'medium', title: 'SWMS reviewed and understood', },
  { key: '1', title: 'PPE worn (hi-vis, boots, gloves, glasses)', },
  { key: '2', title: 'Emergency evacuation plan reviewed', },
  { key: '3', title: 'Emergency Assembly point identified and communicated', },
];

export function CheckList(props: Props) {
  const { setValue, name, control, listValue, classNameWrap, errors } = props;
  const selectedList: string[] = useWatch({ name, control }) || []

  const messageError = getMessageError(errors, name);

  const onSelect = (option: any) => {
    let newList: string[] = [];
    if (selectedList.some((item) => item === option.key)) {
      // unselect
      newList = selectedList.filter((item) => item !== option.key);
    } else {
      // add
      newList = [...selectedList, option.key];
    }
    setValue(name, newList);
  };

  return (
    <View className={` ${classNameWrap}`}>
      <View className='gap-y-2'>
        {checkListTemp.map((option, index) => {
          const selected = selectedList.some((item) => item === option.key)
          return (
            <Button
              onPress={() => onSelect(option)}
              key={index}
              className={`flex-row items-center gap-x-2`}
            >
              <Image source={selected ? images.checked : images.checkbox} className='w-6 h-6' />
              <Text className='text-[18px]' >{option.title}</Text>
            </Button>
          )
        }
        )}
      </View>

    </View>
  );
}