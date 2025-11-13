import { images } from '@assets/images'
import { Button, Image, Text, View } from '@components/ui'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { convertDDMMYYYY, } from '@utils/date.util'
import React from 'react'

const data = [
  {
    id: 1,
    name: 'Full Wrap',
    lrv: 'LRV001',
    installation: 'Installation',
    status: 'in_progress',
    date: new Date(),
  },
  {
    id: 2,
    name: 'Full Wrap',
    lrv: 'LRV001',
    installation: 'Installation',
    status: 'in_progress',
    date: new Date(),
  },

]
export default function ListJobs() {

  const onPress = (item: any) => {
    navigate(RouteName.UpdateJob, { job: item })
  }

  return (
    <View className='gap-y-4'>
      <Text className='text-base font-medium'>Request to update</Text>
      <View className='gap-4'>
        {data.map((item) => (
          <Button
            key={item.id} className='border border-neutral20 rounded-[10px] p-4 flex-row justify-between'
            onPress={() => onPress(item)}
          >
            <View className='gap-y-2'>
              <Text className='text-base font-semibold'>{item.name}</Text>
              <View className='flex-row items-center gap-x-2'>
                <Image source={images.date} className='w-4 h-4' />
                <Text className=''>{`${item.lrv}`}</Text>
              </View>
              <View className='flex-row items-center gap-x-2'>
                <Image source={images.date} className='w-4 h-4' />
                <Text className=''>{`${item.installation}`}</Text>
              </View>
              <View className='flex-row items-center gap-x-2'>
                <Image source={images.date} className='w-4 h-4' />
                <Text className=''>{`${convertDDMMYYYY(item.date)}`}</Text>
              </View>
            </View>
            <View className='bg-red w-[83px] h-[26px] center rounded-full'>
              <Text className='text-[12px] text-white'>In Progress</Text>
            </View>
          </Button>
        ))}
      </View>
    </View>
  )
}