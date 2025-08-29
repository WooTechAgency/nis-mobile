import { shadowStyle } from '@constants/config.constants'
import { useToggle } from '@hooks/useToggle'
import { goBack } from '@routes/navigationRef'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { PreviewProps } from '@screens/main/incidents/config.incident'
import { convertUTCDate } from '@utils/date.util'
import React from 'react'
import { View } from 'react-native'
import { Item } from './item'
import HeaderPreview from '@components/common/header-preview'

export default function GeneralPreview({ allowEdit }: PreviewProps) {
  const { assessment: { generalInfo }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    goBack()
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.General }))
  }

  return (
    <View className='mt-6 bg-white rounded-[20px]' style={shadowStyle}>
      <HeaderPreview
        label='General'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        allowEdit={allowEdit}
      />
      {!collapsed &&
        <>
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='p-6 pt-5 gap-y-4'>
            <View className='flex-row'>
              <Item label='Site location' value={generalInfo?.location.site_name} classNameWrap='flex-1' />
              <Item label='Date' value={convertUTCDate(generalInfo?.date)} classNameWrap='flex-1' />
            </View>
            <Item label='Project' value={generalInfo?.project} />
            <View className='flex-row'>
              <Item label='Site Team Leader' value={generalInfo?.leader} classNameWrap='flex-1' />
              <Item label='Principal Contractor' value={generalInfo?.contractor} classNameWrap='flex-1' />
            </View>
            <Item label='Safe Work Method Statement' value={generalInfo?.methodStatement} />
            <Item label='Description of Work' value={generalInfo?.description} />
          </View>

        </>
      }
    </View>
  )
}