import { View, Text } from 'react-native'
import React from 'react'
import { Image } from '@components/ui'
import { images } from '@assets/images'

export default function Logo() {
  return (
    <Image source={images.logo} className='sm:h-[62] sm:w-[100] h-[49] w-[186] self-center' />
  )
}