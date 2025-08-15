import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image } from '@components/ui'
import { images } from '@assets/images'
import { goBack } from '@routes/navigationRef'

interface Props {
  title: string
  onCustomBack?: () => void
  isBack?: boolean
  rightComponent?: React.ReactNode
}
export default function Header({ title, onCustomBack, isBack, rightComponent }: Props) {
  return (
    <View className='flex-row items-start justify-between h-[64px]'>
      {isBack && <Image source={images.arrowLeft} className='w-10 h-10' onPress={onCustomBack || goBack} />}
      <Text className='text-[35px] font-medium'>{title}</Text>
      {/* width is equal with Image */}
      {(isBack) && <View className='w-10 h-10' />}
      {rightComponent && <View className='absolute right-4'>{rightComponent}</View>}
    </View>
  )
}