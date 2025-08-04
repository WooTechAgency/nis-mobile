import { View, Text } from 'react-native'
import React from 'react'

export default function Title({ label }: { label: string }) {
  return (
    <Text className='text-[25px] font-semibold'>{label}</Text>

  )
}