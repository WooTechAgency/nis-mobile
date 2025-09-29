import { View, Text } from 'react-native'
import React from 'react'
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { getMessageError } from '@utils/common.util';

interface Props {
  name: string;
  control: Control<any, any>;
  errors?: FieldErrors;
}


export default function InitialRiskRating({ control, name, errors }: Props) {
  const messageError = getMessageError(errors, name);

  const initialRiskRating = useWatch({ control, name })

  return (
    <View>
      <View className='row-center justify-between p-6 border border-border rounded-[14px]'>
        <Text className='font-semibold'>Initial Risk Rating</Text>
        {initialRiskRating
          ? <View
            style={{ backgroundColor: initialRiskRating?.bg }}
            className={` h-[56px] w-[227px] bg-teal20 rounded-[14px] justify-center items-center`}
          >
            <Text className='font-medium'>{initialRiskRating?.title}</Text>
          </View>
          : <View className='rounded-[14px] h-[56px] w-[200px] center border border-border'>
            <Text className='text-xs text-neutral70'>{`Select parameters above\nto a define a Risk Rating`}</Text>
          </View>
        }
      </View>
      {messageError && <Text className='text-red text-[12px] mt-2 ml-4'>{messageError}</Text>}
    </View>
  )
}