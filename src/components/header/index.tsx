import { images } from '@assets/images'
import { Button, Image } from '@components/ui'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
  title?: string
  onCustomBack?: () => void
  isBack?: boolean
  rightComponent?: React.ReactNode
  leftComponent?: React.ReactNode
}
export default function Header({ title, onCustomBack, isBack, rightComponent, leftComponent }: Props) {
  return (
    <View className='flex-row items-start sm:items-center justify-between h-[50px] mt-4 sm:mt-0 mb-6 sm:mb-[14px]  border-b border-neutral40 sm:border-b-0'>
      {leftComponent ? leftComponent : <Text className='text-[23px] sm:text-[35px] font-medium flex-1' numberOfLines={1}>{title}</Text>}
      {isBack &&
        <View className='flex-row items-center'>
          {rightComponent && rightComponent}
          <Button className='flex-row items-center ' onPress={onCustomBack || goBack}>
            <Image source={images.arrowLeft} className='w-10 h-10' />
            <Text>Back</Text>
          </Button>
        </View>
      }
      {rightComponent && rightComponent}
    </View>
  )
}