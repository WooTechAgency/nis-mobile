import { images } from '@assets/images'
import Title from '@components/title'
import { Button, Image, Text } from '@components/ui'
import { isIpad, isIphone } from '@constants/app.constants'
import { useAppSelector } from '@hooks/common'
import { IncidentModel } from '@lib/models/incident-model'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@realm/react'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { getCurrentUserApi } from '@services/authentication.service'
import { showErrorMessage } from '@utils/functions.util'
import React, { useState } from 'react'
import { View } from 'react-native'

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

  console.log('inprogressIncidents', inprogressIncidents)

  const checkPermissionAndRedirect = async (item: any) => {
    try {
      const user = await getCurrentUserApi()
      const permission = user?.role?.permissions?.incident_reports?.find((permission) => permission.action === 'create')
      if (permission) {
        navigate(RouteName.CreateIncident, { incidentId: item.id })

      } else {
        showErrorMessage({ message: 'You do not have permission to perform this action' })
      }
    } catch (error) {
      showErrorMessage({ message: 'You do not have permission to perform this action' })
    }
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
          <Title label='Today' className='mt-4 sm:mb-2' />
          {inprogressIncidents.map((item) => (
            <Button
              className='flex-row items-end  bg-white justify-between rounded-[20px] p-4 sm:p-6 mt-4 '
              key={item.id}
              disabled={isIpad}
              onPress={() => checkPermissionAndRedirect(item)}
            >
              <View className='flex-1 gap-y-4 '>
                <View className={`flex-row  items-center gap-x-3 ${isIphone && 'justify-between'}`}>
                  <Text className='text-base font-semibold'>{item.generalInfo?.siteLocation?.site_code}</Text>
                  <View className={`px-[10px] h-[24px] center rounded-full bg-orange10 `}>
                    <Text className='text-xs font-medium'>{'IN PROGRESS'}</Text>
                  </View>
                </View>
                <View className='flex-row  items-center gap-x-1 '>
                  <Image source={images.location} className='w-8 h-8' />
                  <Text className='text-base shrink sm:mr-4 flex-1' numberOfLines={1}>{item?.generalInfo?.siteLocation?.site_name}</Text>
                  {isIphone && <Image source={images.arrowRight} className='w-8 h-8' />}
                </View>
              </View>
              {isIpad && (
                <Button
                  label='Continue'
                  onPress={() => checkPermissionAndRedirect(item)}
                  className='h-[56px] w-[204px]'
                  classNameLabel='font-regular'
                />
              )}
            </Button>
          ))}
        </>
      }

    </View>
  )
}