import HeaderPreview from '@components/common/header-preview'
import { shadowStyle } from '@constants/config.constants'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { PreviewProps } from '@screens/main/incidents/config.incident'
import { convertHazardFromBE } from '@utils/functions.util'
import React from 'react'
import { View } from 'react-native'
import HazardItemPreview from './hazard-item-preview'

export default function HazardPreview({ allowEdit, dsra }: PreviewProps) {
  const { assessment: { hazard }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: true }))
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Hazards }))
  }

  const hazards = hazard?.hazards || convertHazardFromBE(dsra?.hazards || []) || []

  return (
    <View className='mt-6 bg-white rounded-[20px]' style={shadowStyle}>
      <HeaderPreview
        label='Additional Hazard'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        allowEdit={allowEdit}
      />
      <View className='w-full h-[1px] bg-neutral20 ' />
      {!collapsed &&
        <View className='p-6 pt-5 gap-y-6'>
          {hazards?.map((item, index) => (
            <View key={index}>
              <HazardItemPreview
                hazard={item}
                dsra={dsra}
                index={index}
              />
              {hazard?.hazards && hazard?.hazards?.length > 0 && index !== hazard.hazards.length - 1 &&
                <View className='w-full h-[1px] bg-neutral30' />}
            </View>
          ))}
        </View>
      }
    </View>
  )
}