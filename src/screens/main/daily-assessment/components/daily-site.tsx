import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image } from '@components/ui'
import { images } from '@assets/images'
import { RouteName } from '@routes/types'
import { navigate } from '@routes/navigationRef'
const steps = [1, 2, 3, 4, 5]
const location = 'Pier 26, Darling Harbour'

export default function DailySite() {
  return (
    <Button className='mt-4' onPress={() => navigate(RouteName.CreateDailyAssessment)}>
      <Text className='text-[20px]'>Today</Text>
      <View className='border rounded-[20px] p-5 border-primary mt-6'>
        <View className='flex-row items-center justify-between '>
          <Text className='text-[25px] font-semibold'>{'DRSA - 001'}</Text>
          <View className='px-1 py-2 min-w-[120px] h-[38px] rounded-full bg-gray justify-center items-center'>
            <Text className='text-white'>{'Pending'}</Text>
          </View>
        </View>
        <View className='flex-row items-center gap-x-2 mt-2'>
          <Image source={images.logo} className='w-[22px] h-[22px]' />
          <Text className=''>{location}</Text>
        </View>
        {/* steps */}
        <View className='flex-row mt-6'>
          {steps.map((step, index) =>
            <View className='flex-row items-center ' key={index}>
              <View className='w-[30px] h-[30px] justify-center items-center rounded-full border '>
                <Text>{step}</Text>
              </View>
              {index !== steps.length - 1 && <View className='w-[50px] h-[1px] bg-primary mx-4' />}
            </View>
          )}
        </View>
      </View>
    </Button>
  )
}