import { images } from '@assets/images'
import Title from '@components/title'
import { Button, Image, Text } from '@components/ui'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import React from 'react'
import { View, } from 'react-native'
const steps = [1, 2, 3, 4, 5]
const location = 'Pier 26, Darling Harbour'

enum DsraStatus {
  Complete = 'complete',
  InProgress = 'progress',
}

const MAP_STATUS_TITLE = {
  'complete': 'COMPLETE',
  'progress': 'IN PROGRESS',
}

const MAP_STATUS_BG = {
  [DsraStatus.Complete]: 'bg-positive30',
  [DsraStatus.InProgress]: 'bg-orange10',
}

const dsra = [
  {
    id: 'DHP-2',
    location: 'Pier 24, Darling Harbour',
    hazardNumber: 3,
    status: DsraStatus.InProgress
  },
  {
    id: 'DHP-3',
    location: 'Pier 24, Darling Harbour',
    hazardNumber: 3,
    status: DsraStatus.Complete
  },
]

const isNoDSRA = !true
const buttonCls = {
  className: 'h-[56px] w-[204px]',
  classNameLabel: 'font-regular'
}
export default function DailySite() {

  const onContinue = () => {

  }
  const onAddHazard = () => {

  }
  const onViewDetail = () => {

  }

  return (
    <View>
      <View className='row-center h-[104px]  justify-between rounded-[20px] p-6 border border-border' >
        <Text className=' font-semibold'>Need to perform a DSRA?</Text>
        <Button
          label='Complete DSRA'
          classNameLabel='font-regular'
          onPress={() => navigate(RouteName.CreateDailyAssessment)}
        />
      </View>
      {/* today */}
      <Title label='Today' className='mt-6' />
      {isNoDSRA
        ?
        <View className='row-center justify-between rounded-[20px] p-6 border border-border mt-6'>
          <Text className='text-neutral60 '>No DSRAs logged today</Text>
        </View>
        :
        dsra.map((item) => (
          <View
            className='flex-row items-end  bg-white justify-between rounded-[20px] p-6 mt-6 '
            key={item.id}
          >
            <View className=''>
              <View className='flex-row  items-center gap-x-3 mb-4'>
                <Text className='text-base font-semibold'>{item.id}</Text>
                <View className={`px-[10px] h-[24px] center rounded-full ${MAP_STATUS_BG[item.status]} `}>
                  <Text className='text-xs font-medium'>{MAP_STATUS_TITLE[item.status]}</Text>
                </View>
              </View>
              <View className='flex-row  items-center gap-x-1'>
                <Image source={images.location} className='w-8 h-8' />
                <Text className='text-base'>{item.location}</Text>
              </View>
              <View className='flex-row  items-center gap-x-1'>
                <Image source={images.warning} className='w-8 h-8' />
                <Text className='text-base'>{`${item.hazardNumber} new hazards`}</Text>
              </View>
            </View>
            {item.status === DsraStatus.Complete
              ? <View className='row-center gap-x-4'>
                <Button
                  onPress={onAddHazard}
                  label='Add hazard'
                  type='outlined'
                  {...buttonCls}
                />
                <Button
                  onPress={onViewDetail}
                  label='View detail'
                  {...buttonCls}
                />
              </View>
              : <Button
                label='Continue'
                onPress={onContinue}
                {...buttonCls}
              />
            }

          </View>
        ))

      }

      <Button className='mt-4' >
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

        </View>
      </Button>
    </View>
  )
}