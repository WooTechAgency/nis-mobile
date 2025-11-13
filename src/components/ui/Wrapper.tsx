import { View, Text } from 'react-native'
import React from 'react'
import { shadowStyle } from '@constants/config.constants'
interface Props {
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined
  children: React.ReactNode
  className?: string
}
export function Wrapper({ children, className, pointerEvents }: Props) {
  return (
    <View
      className={`mt-8 bg-white p-4 sm:px-6 sm:pb-6 sm:pt-5 rounded-[20px] ${className}`}
      style={shadowStyle}
      pointerEvents={pointerEvents}
    >
      {children}
    </View>
  )
}