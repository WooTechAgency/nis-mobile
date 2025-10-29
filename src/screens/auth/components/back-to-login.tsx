import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image } from '@components/ui'
import { goBack } from '@routes/navigationRef'
import { images } from '@assets/images'
import { isIpad } from '@constants/app.constants'

export default function BackToLogin({ className }: { className?: string }) {
  if (isIpad) {
    return (
      <Button className={`flex-row items-center self-center mt-3 ${className}`} onPress={goBack}>
        <Text className='text-[12px]'>Back to Log in</Text>
      </Button>
    )
  }
  return (
    <Button className={`flex-row items-center px-3 ${className}`} onPress={goBack}>
      <Image source={images.arrowLeft} className='w-8 h-8' />
      <Text className='text-[12px] font-medium'>Back</Text>
    </Button>
  )
}