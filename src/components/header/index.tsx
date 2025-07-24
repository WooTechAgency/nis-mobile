import { View, Text } from 'react-native'
import React from 'react'
import { Image } from '@components/ui'
import { images } from '@assets/images'
import { goBack } from '@routes/navigationRef'

interface Props {
  title: string
  onCustomBack?: () => void
}
export default function Header({ title, onCustomBack }: Props) {
  return (
    <View className='flex-row items-center justify-between h-[69px]'>
      <Image source={images.arrowLeft} className='w-10 h-10' onPress={onCustomBack || goBack} />
      <Text className='text-[35px] font-semibold'>{title}</Text>
      {/* width is equal with Image */}
      <View className='w-10 h-10' />
    </View>
  )
}