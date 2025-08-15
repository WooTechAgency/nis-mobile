import { View, Text } from 'react-native'
import React from 'react'
import { shadowStyle } from '@constants/config.constants'

export function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <View className={`mt-8 bg-white px-6 pb-6 pt-5 rounded-[20px] ${className}`} style={shadowStyle}>
      {children}
    </View>
  )
}