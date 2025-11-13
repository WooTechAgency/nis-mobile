import { images } from '@assets/images'
import { Button, Image, Text, View } from '@components/ui'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { convertDDMMYYYY, } from '@utils/date.util'
import React from 'react'

const data = [
  {
    id: 1,
    name: 'CAT 3 Medical',
    award_date: new Date(),
    expiry_date: new Date(),
  },
  {
    id: 2,
    name: 'CAT 3 Medical',
    award_date: new Date(),
    expiry_date: new Date(),
  },
  {
    id: 3,
    name: 'CAT 3 Medical',
    award_date: new Date(),
    expiry_date: new Date(),
  },
]
export default function RequestToUpdate() {

  const onPress = (item: any) => {
    navigate(RouteName.UpdateCertificate, { certificate: item })
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
                <Text className='text-base'>{`Award date: ${convertDDMMYYYY(item.award_date)}`}</Text>
              </View>
              <View className='flex-row items-center gap-x-2'>
                <Image source={images.date} className='w-4 h-4' />
                <Text className='text-base '>{`Expiry date: ${convertDDMMYYYY(item.expiry_date)}`}</Text>
              </View>
            </View>
            <View className='bg-red w-[73px] h-[26px] center rounded-full'>
              <Text className='text-[12px] text-white'>Missing</Text>
            </View>
          </Button>
        ))}
      </View>
    </View>
  )
}