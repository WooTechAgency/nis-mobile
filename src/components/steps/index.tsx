import { shadowStyle } from '@constants/config.constants'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
  classNameWrap?: string
  steps: Record<string, string>
  selectedIndex: number
  completedSteps: number[] | undefined,
  lastItemKey: number
}
export default function Steps({ steps, selectedIndex, completedSteps, lastItemKey, classNameWrap }: Props) {
  return (
    <View className={`flex-row bg-white p-6 rounded-[20px] ${classNameWrap}`} style={shadowStyle}>
      {Object.entries(steps).map(([key, value]) => {
        const selected = key === String(selectedIndex)
        const lastItem = key === String(lastItemKey)
        const completed = completedSteps?.includes(Number(key))
        return (
          <View key={key} className={`flex-row items-center ${key !== '5' && 'flex-grow '} `}>
            <View className='items-center'>
              <View className={`w-[31px] h-[31px] rounded-full border center ${completed && 'border border-primary'} ${selected && 'bg-primary border-0'}`}>
                <Text className={`font-medium `}>{key}</Text>
              </View>
              <Text className='mt-1'>{value}</Text>
            </View>
            {!lastItem && <View className='h-[1px] flex-1  bg-neutral50 mx-4 -mt-5' />}
          </View>
        )
      })}
    </View>
  )
}