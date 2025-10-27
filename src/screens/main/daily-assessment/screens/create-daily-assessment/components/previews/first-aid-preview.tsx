import HeaderPreview from '@components/common/header-preview'
import { ValueItem } from '@components/common/value-item'
import { shadowStyle } from '@constants/config.constants'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { PreviewProps } from '@screens/main/incidents/config.incident'
import React from 'react'
import { View } from 'react-native'

export default function FirstAidPreview({ allowEdit, dsra }: PreviewProps) {
  const { assessment: { firstAid, generalInfo }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: true }))
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.FirstAid }))
  }

  return (
    <View className='mt-6 bg-white rounded-[20px]' style={shadowStyle}>
      <HeaderPreview
        label='First Aid'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        allowEdit={allowEdit}
      />
      {!collapsed &&
        <>
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='p-6 pt-5 gap-y-4'>
            <View className='flex-row gap-x-4'>
              <ValueItem label='Name of on-site First Aider' value={firstAid?.name || dsra?.site_first_aider_name} classNameWrap='flex-1' />
              <ValueItem label='First Aid Box Location' value={firstAid?.firstAidLocation || dsra?.first_aid_box_location} classNameWrap='flex-1' />
            </View>
            <View className='flex-row gap-x-4'>
              <ValueItem label='Location of Nearest Hospital' value={generalInfo?.location.location_of_nearest_hospital || dsra?.site?.location_of_nearest_hospital} classNameWrap='flex-1' />
              <ValueItem label='Emergency Assembly Point' value={generalInfo?.location.emergency_assembly_point || dsra?.site?.emergency_assembly_point} classNameWrap='flex-1' />
            </View>
          </View>
        </>
      }
    </View>
  )
}