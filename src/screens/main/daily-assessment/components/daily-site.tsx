import { images } from '@assets/images'
import Title from '@components/title'
import { Button, Image, Text } from '@components/ui'
import { useAppSelector } from '@hooks/common'
import { DailyAssessmentModel } from '@lib/models/daily-assessment-model'
import { useQuery } from '@realm/react'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { convertModelToDailyAssessment } from '@utils/realm.util'
import React from 'react'
import { View, } from 'react-native'

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
  className: 'h-[56px] w-[204px]',
  classNameLabel: 'font-regular'
}
export default function DailySite() {

  const { userInfo } = useAppSelector((state) => state.authentication)

  const inprogressAssessments =
    useQuery(DailyAssessmentModel, (collection) => {
      return collection.filtered('creatorId == $0', userInfo?.id);
    }).map(assessment => ({
      ...assessment,
      ...convertModelToDailyAssessment(assessment)
    }))

  const onContinue = (id: string) => {
    navigate(RouteName.CreateDailyAssessment, { assessmentId: id })

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
      {inprogressAssessments.length === 0
        ?
        <View className='row-center justify-between rounded-[20px] p-6 border border-border mt-6'>
          <Text className='text-neutral60 '>No DSRAs logged today</Text>
        </View>
        :
        inprogressAssessments.map((item) => (
          <View
            className='flex-row items-end  bg-white justify-between rounded-[20px] p-6 mt-6 '
            key={item.id}
          >
            <View className=''>
              <View className='flex-row  items-center gap-x-3 mb-4'>
                <Text className='text-base font-semibold'>{item.generalInfo?.location.site_code}</Text>
                <View className={`px-[10px] h-[24px] center rounded-full ${MAP_STATUS_BG['progress']} `}>
                  <Text className='text-xs font-medium'>{MAP_STATUS_TITLE['progress']}</Text>
                </View>
              </View>
              <View className='flex-row  items-center gap-x-1'>
                <Image source={images.location} className='w-8 h-8' />
                <Text className='text-base'>{item.generalInfo?.location.site_name}</Text>
              </View>
              <View className='flex-row  items-center gap-x-1'>
                <Image source={images.warning} className='w-8 h-8' />
                <Text className='text-base'>{`${item?.hazard?.hazards?.length || 0} new hazards`}</Text>
              </View>
            </View>
            <Button
              label='Continue'
              onPress={() => onContinue(item.id)}
              {...buttonCls}
            />
            {/* {item.status === DsraStatus.Complete
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
            } */}

          </View>
        ))
      }
    </View>
  )
}