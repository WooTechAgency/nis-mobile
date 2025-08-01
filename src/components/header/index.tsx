import { View, Text } from 'react-native'
import React from 'react'
import { Image } from '@components/ui'
import { images } from '@assets/images'
import { goBack } from '@routes/navigationRef'

interface Props {
  title: string
  onCustomBack?: () => void
  isBack?: boolean
}
export default function Header({ title, onCustomBack, isBack }: Props) {
  return (
    <View className='flex-row items-center justify-between h-[69px]'>
      {isBack && <Image source={images.arrowLeft} className='w-10 h-10' onPress={onCustomBack || goBack} />}
      <Text className='text-[35px] font-semibold'>{title}</Text>
      {/* width is equal with Image */}
      {isBack && <View className='w-10 h-10' />}

    </View>
  )
}