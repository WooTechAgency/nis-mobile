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
      className={`mt-8 bg-white px-6 pb-6 pt-5 rounded-[20px] ${className}`}
      style={shadowStyle}
      pointerEvents={pointerEvents}
    >
      {children}
    </View>
  )
}