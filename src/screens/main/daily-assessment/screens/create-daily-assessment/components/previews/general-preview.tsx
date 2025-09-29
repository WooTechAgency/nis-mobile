import HeaderPreview from '@components/common/header-preview'
import { ValueItem } from '@components/common/value-item'
import { shadowStyle } from '@constants/config.constants'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { PreviewProps } from '@screens/main/incidents/config.incident'
import { convertUTCDate } from '@utils/date.util'
import React from 'react'
import { View } from 'react-native'

export default function GeneralPreview({ allowEdit, dsra }: PreviewProps) {
  const { assessment: { generalInfo }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: true }))
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
              <ValueItem label='Site location' value={generalInfo?.location.site_name || dsra?.site?.site_name} classNameWrap='flex-1' />
              <ValueItem label='Date' value={convertUTCDate(generalInfo?.date || dsra?.created_at)} classNameWrap='flex-1' />
            </View>
            <ValueItem label='Project' value={generalInfo?.project || dsra?.project} />
            <View className='flex-row'>
              <ValueItem label='Site Team Leader' value={generalInfo?.leader?.label || dsra?.team_leader_details?.full_name} classNameWrap='flex-1' />
              <ValueItem label='Principal Contractor' value={generalInfo?.contractor || dsra?.principal_contractor} classNameWrap='flex-1' />
            </View>
            <ValueItem label='Safe Work Method Statement' value={generalInfo?.methodStatement || dsra?.site?.swms?.swms_name} />
            <ValueItem label='Description of Work' value={generalInfo?.description || dsra?.description_of_work} />
          </View>
        </>
      }
    </View>
  )
}