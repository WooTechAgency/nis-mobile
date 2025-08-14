import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image } from '@components/ui'
import { images } from '@assets/images'
import { RouteName } from '@routes/types'
import { navigate } from '@routes/navigationRef'
import Title from '@components/title'
const steps = [1, 2, 3, 4, 5]
const location = 'Pier 26, Darling Harbour'

const MAP_STATUS_TITLE = {
  'complete': 'COMPLETE',
  'progress': 'In Progress',
}

const MAP_STATUS_BG = {
  'complete': 'bg-orange100',
  'progress': 'bg-positive30',
}

export default function DailySite() {
  return (
    <View>
      <View className='row-center h-[104px] bg-white justify-between rounded-[20px] p-6'>
        <Text className='text-base'>Need to perform a DSRA?</Text>
        <Button label='Complete DSRA' classNameLabel='font-regular' />
      </View>
      {/* today */}
      <Title label='Today' className='my-6' />
      <View className='flex-row items-end  bg-white justify-between rounded-[20px] p-6 '>
        <View className=''>
          <View className='flex-row  items-center gap-x-3 mb-4'>
            <Text className='text-base font-semibold'>DSRA-2</Text>
            <View className={`px-2.5 h-[24px] center rounded-full bg-positive30`}>
              <Text>{MAP_STATUS_TITLE['complete']}</Text>
            </View>
          </View>
          <View className='flex-row  items-center gap-x-1'>
            <Image source={images.location} className='w-8 h-8' />
            <Text className='text-base'>{'Pier 24, Darling Harbour'}</Text>
          </View>
          <View className='flex-row  items-center gap-x-1'>
            <Image source={images.warning} className='w-8 h-8' />
            <Text className='text-base'>{`${0} new hazards`}</Text>
          </View>
        </View>
        <Button label='Complete DSRA' classNameLabel='font-regular' />
      </View>

      <Button className='mt-4' onPress={() => navigate(RouteName.CreateDailyAssessment)}>
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
    </View>
  )
}