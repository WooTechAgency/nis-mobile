import { images } from '@assets/images'
import Title from '@components/title'
import { Button, Image, Text } from '@components/ui'
import { useAppSelector } from '@hooks/common'
import { DailyAssessmentModel } from '@lib/models/daily-assessment-model'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@realm/react'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { getCurrentUserApi } from '@services/authentication.service'
import { DSRA } from '@services/dsra.service'
import { useGetDsrasToday } from '@services/hooks/dsra/useGetDsras'
import { showErrorMessage } from '@utils/functions.util'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { View, } from 'react-native'
import { DailyAssessmentSteps, useAssessmentContext } from '../context'

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

const buttonCls = {
  className: 'h-[56px] w-[170px]',
  classNameLabel: 'font-regular'
}
export default function TodayDailyAssessments() {
  const { setAssessment } = useAssessmentContext()
  const { userInfo } = useAppSelector((state) => state.authentication)
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: dsraToday, refetch } = useGetDsrasToday({
    date_from: dayjs(new Date()).format('YYYY-MM-DD'),
    date_to: dayjs(new Date()).format('YYYY-MM-DD'),
    search_types: 'tablet',
    author_id: userInfo?.id
  })

  const inprogressAssessments =
    useQuery(DailyAssessmentModel, (collection) => {
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
    }, [refreshKey]).map(assessment => {
      const generalInfo = JSON.parse(assessment.generalInfo || '{}')
      const hazard = JSON.parse(assessment.hazard || '{}')
      return {
        id: assessment.id,
        site_code: generalInfo?.location?.site_code,
        site_name: generalInfo?.location?.site_name,
        hazardsLength: hazard?.hazards?.length,
        swms_url: generalInfo?.location?.swms?.attachment,
        status: 'progress',
      }
    })

  console.log(inprogressAssessments)
  const mergedData = [...inprogressAssessments || [], ...dsraToday || []]

  const onContinue = (id: number) => {
    navigate(RouteName.CreateDailyAssessment, { assessmentId: id })

  }
  const onAddHazard = (dsraData: DSRA) => {
    navigate(RouteName.CreateDailyAssessment, {
      editingMode: true,
      dsraData: dsraData,
    })
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Hazards }))

  }
  const onViewDetail = (id: number) => {
    navigate(RouteName.DailyAssessmentPreview, { dsraId: id })
  }

  const checkPermissionAndRedirect = async () => {
    try {
      const user = await getCurrentUserApi()
      const permission = user?.role?.permissions?.DSRA?.find((permission) => permission.action === 'create')
      if (permission) {
        navigate(RouteName.CreateDailyAssessment)
      } else {
        showErrorMessage({ message: 'You do not have permission to perform this action' })
      }
    } catch (error) {
      showErrorMessage({ message: 'You do not have permission to perform this action' })
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      refetch()
      setRefreshKey(prev => prev + 1);
    }, [refetch])
  );

  return (
    <View>
      <View className='row-center h-[104px]  justify-between rounded-[20px] p-6 border border-border' >
        <Text className=' font-semibold'>Need to perform a DSRA?</Text>
        <Button
          label='Complete DSRA'
          classNameLabel='font-regular'
          onPress={checkPermissionAndRedirect}
        />
      </View>
      {/* today */}
      <Title label='Today' className='mt-6' />
      {mergedData.length === 0
        ?
        <View className='row-center justify-between rounded-[20px] p-6 border border-border mt-6'>
          <Text className='text-neutral60 '>No DSRAs logged today</Text>
        </View>
        :
        mergedData.map((item) => (
          <View
            className='flex-row items-end justify-between bg-white  rounded-[20px] p-6 mt-6 gap-x-4 '
            key={item.id}
          >
            <View className='flex-1'>
              <View className='flex-row  items-center gap-x-3 mb-4'>
                <Text className='text-base font-semibold'>{item?.dsra_code || item?.site_code}</Text>
                <View className={`px-[10px] h-[24px] center rounded-full ${MAP_STATUS_BG[item.status as DsraStatus]} `}>
                  <Text className='text-xs font-medium'>{MAP_STATUS_TITLE[item.status as DsraStatus]}</Text>
                </View>
              </View>
              <View className='flex-row  items-center gap-x-1'>
                <Image source={images.location} className='w-8 h-8' />
                <Text className='text-base shrink' numberOfLines={1}>{item?.site_name}</Text>
              </View>
              <View className='flex-row  items-center gap-x-1'>
                <Image source={images.warning} className='w-8 h-8' />
                <Text className='text-base'>{`${item?.hazardsLength || 0} new hazards`}</Text>
              </View>
            </View>
            {item.status === 'progress' ? (
              <View className='flex-row  items-center gap-x-4'>
                <Button
                  label='View SWMS'
                  onPress={() => {
                    navigate(RouteName.ShowDocument, { url: item.swms_url as string })
                  }}
                  {...buttonCls}
                  type='outlined'
                />
                <Button
                  label='Continue'
                  onPress={() => onContinue(item.id as number)}
                  {...buttonCls}
                />
              </View>
            ) : (
              <View className='flex-row items-center gap-x-4'>
                <Button
                  label='Add hazard'
                  onPress={() => onAddHazard(item as DSRA)}
                  {...buttonCls}
                  type='outlined'
                />
                <Button
                  label='View SWMS'
                  onPress={() => navigate(RouteName.ShowDocument, { url: item.site?.swms?.attachment })}
                  {...buttonCls}
                  type='outlined'
                />
                <Button
                  label='View Detail'
                  onPress={() => onViewDetail(item.id)}
                  {...buttonCls}
                />
              </View>

            )}
          </View>
        ))
      }
    </View>
  )
}