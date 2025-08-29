import { View, Text } from 'react-native'
import React from 'react'

export default function AccountLogo({ name }: { name: string }) {
  const formatName = name?.split(" ")?.map(word => word[0]).join("")?.toUpperCase() || '';
  return (
    <View className='w-[108px] h-[108px] rounded-full bg-primary center'>
      <Text className='text-[28px] font-semibold text-black'>{formatName}</Text>
    </View>
  )
}