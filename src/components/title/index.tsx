import { View, Text } from 'react-native'
import React from 'react'

export default function Title({ label, className }: { label: string, className?: string }) {
  return (
    <Text className={`text-[20px] font-semibold ${className}`}>{label}</Text>

  )
}