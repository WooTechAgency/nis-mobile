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
    <View className='flex-row items-center justify-between h-[50px] mb-[14px]'>
      {(isBack) && <View className='w-10 h-10' />}
      <Text className='text-[35px] font-medium'>{title}</Text>
      {isBack && <Button className='flex-row items-center ' onPress={onCustomBack || goBack}>
        <Image source={images.arrowLeft} className='w-10 h-10' />
        <Text>Back</Text>
      </Button>
      }
    </View>
  )
}