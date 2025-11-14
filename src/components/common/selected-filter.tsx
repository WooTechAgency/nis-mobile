import { images } from '@assets/images'
import { Image } from '@components/ui'
import React from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { Text, View } from 'react-native'

interface Props {
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
}
export default function SelectedFilter({ name, label, setValue }: Props) {
  return (
    <View className='row-center pl-3 rounded-lg bg-teal20 ' key={label}>
      <Text className='text-xs font-medium text-wrap shrink  text-left max-w-[95%] '>{label}</Text>
      <Image
        source={images.close32} className='w-8 h-8'
        onPress={() => setValue(name, null)}
      />
    </View>
  )
}