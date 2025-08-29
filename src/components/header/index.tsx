import { images } from '@assets/images'
import { Button, Image } from '@components/ui'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
  title: string
  onCustomBack?: () => void
  isBack?: boolean
  rightComponent?: React.ReactNode
}
export default function Header({ title, onCustomBack, isBack, rightComponent }: Props) {
  return (
    <View className='flex-row items-center justify-between h-[50px] mb-[14px]'>
      <Text className='text-[35px] font-medium'>{title}</Text>
      {isBack &&
        <View className='flex-row items-center'>
          {rightComponent && rightComponent}
          <Button className='flex-row items-center ' onPress={onCustomBack || goBack}>
            <Image source={images.arrowLeft} className='w-10 h-10' />
            <Text>Back</Text>
          </Button>
        </View>

      }
    </View>
  )
}