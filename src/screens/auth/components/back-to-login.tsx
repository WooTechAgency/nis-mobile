import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image } from '@components/ui'
import { goBack } from '@routes/navigationRef'
import { images } from '@assets/images'

export default function BackToLogin({ className }: { className?: string }) {
  return (
    <Button className={`flex-row items-center self-center ${className}`} onPress={goBack}>
      <Image source={images.arrowLeft} className='w-8 h-8' />
      <Text>Back to Log in</Text>
    </Button>
  )
}