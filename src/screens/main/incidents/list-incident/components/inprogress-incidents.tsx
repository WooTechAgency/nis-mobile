import { images } from '@assets/images'
import Title from '@components/title'
import { Button, Image } from '@components/ui'
import { useAppSelector } from '@hooks/common'
import { IncidentModel } from '@lib/models/incident-model'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@realm/react'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import React, { useState } from 'react'
import { Text, View } from 'react-native'

export default function InprogressIncidents() {
  const { userInfo } = useAppSelector((state) => state.authentication)
  const [refreshKey, setRefreshKey] = useState(0);

  const inprogressIncidents =
    useQuery(IncidentModel, (collection) => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const startOfTomorrow = new Date(startOfToday);
      startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

      return collection.filtered(
        'creatorId == $0 AND createdAt >= $1 AND createdAt < $2',
        userInfo?.id ?? 0,
        startOfToday,
        startOfTomorrow,
      );
    }, [refreshKey]).map(incident => ({
      ...incident,
      generalInfo: JSON.parse(incident.generalInfo || '{}'),
    }))

  const onContinue = (item: any) => {
    navigate(RouteName.CreateIncident, { incidentId: item.id })
  }

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(prev => prev + 1);
    }, [setRefreshKey])
  );

  return (
    <View className='mt-2'>
      {inprogressIncidents?.length > 0 &&
        <>
          <Title label='Today' className='mt-4 mb-2' />
          {inprogressIncidents.map((item, index) => (
            <View
              className='flex-row items-end  bg-white justify-between rounded-[20px] p-6 mt-4 '
              key={item.id}
            >
              <View className=''>
                <View className='flex-row  items-center gap-x-3 mb-4'>
                  <Text className='text-base font-semibold'>{item.generalInfo.siteLocation.site_code}</Text>
                  <View className={`px-[10px] h-[24px] center rounded-full bg-orange10 `}>
                    <Text className='text-xs font-medium'>{'IN PROGRESS'}</Text>
                  </View>
                </View>
                <View className='flex-row  items-center gap-x-1'>
                  <Image source={images.location} className='w-8 h-8' />
                  <Text className='text-base'>{item.generalInfo.siteLocation.site_name}</Text>
                </View>
              </View>
              <Button
                label='Continue'
                onPress={() => onContinue(item)}
                className='h-[56px] w-[204px]'
                classNameLabel='font-regular'
              />
            </View>
          ))}
        </>
      }

    </View>
  )
}