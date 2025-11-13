import { isIpad, isIphone } from '@constants/app.constants'
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

const MAP_KEY = {
  '1': '-left-0.5',
  '2': '-left-1',
  '3': 'left-0.5',
  '4': '-left-1',
  '5': '-left-0.5',
}

export default function Steps({ steps, selectedIndex, completedSteps, lastItemKey, classNameWrap }: Props) {
  return (
    <View className={`flex-row bg-white px-7 pt-5 pb-10 sm:px-6 sm:pt-6 sm:pb-6 rounded-[14px] sm:rounded-[20px] ${classNameWrap}`} style={shadowStyle}>
      {Object.entries(steps).map(([key, value]) => {
        const selected = key === String(selectedIndex)
        const lastItem = key === String(lastItemKey)
        const completed = completedSteps?.includes(Number(key))
        return (
          <View key={key} className={`flex-row items-center ${key !== '5' && 'flex-grow '} `}>
            <View className='items-center'>
              <View className={`w-[31px] h-[31px] rounded-full border center 
                ${completed && 'border border-primary'}
                ${selected && 'bg-primary border-0'}`}
              >
                <Text className={`font-medium  `}>{key}</Text>
              </View>
              {isIpad && <Text className='mt-2'>{value}</Text>}
            </View>
            {isIpad && !lastItem && <View className='h-[1px] flex-1 bg-neutral50 mx-4 -mt-5' />}
            {isIphone && (
              <>
                {!lastItem && <View className='h-[1px] flex-1  bg-neutral50 mx-4' />}
                {selected && <Text className={`mt-1 absolute top-10 text-[10px] text-neutral70 ${MAP_KEY[key]}`}>{value}</Text>}
              </>
            )}
          </View>
        )
      })}
    </View>
  )
}