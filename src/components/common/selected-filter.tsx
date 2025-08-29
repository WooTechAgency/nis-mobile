import { View, Text } from 'react-native'
import React from 'react'
import { Image } from '@components/ui'
import { images } from '@assets/images'
import { IDropdown } from '@constants/interface'
import { UseFormSetValue } from 'react-hook-form'

interface Props {
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
}
export default function SelectedFilter({ name, label, setValue }: Props) {
  return (
    <View className='row-center pl-3 rounded-lg bg-teal20' key={label}>
      <Text className='text-xs font-medium'>{label}</Text>
      <Image
        source={images.close32} className='w-8 h-8'
        onPress={() => setValue(name, null)}
      />
    </View>
  )
}