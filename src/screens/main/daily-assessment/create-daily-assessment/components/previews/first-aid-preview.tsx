import HeaderPreview from '@components/common/header-preview'
import { shadowStyle } from '@constants/config.constants'
import { useToggle } from '@hooks/useToggle'
import { goBack } from '@routes/navigationRef'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { PreviewProps } from '@screens/main/incidents/config.incident'
import React from 'react'
import { View } from 'react-native'
import { Item } from './item'

export default function FirstAidPreview({ allowEdit }: PreviewProps) {
  const { assessment: { firstAid, generalInfo }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    goBack()
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
            <View className='flex-row'>
              <Item label='Name of on-site First Aider' value={firstAid?.name} classNameWrap='flex-1' />
              <Item label='First Aid Box Location' value={generalInfo?.location.first_aid_box_location} classNameWrap='flex-1' />
            </View>
            <View className='flex-row'>
              <Item label='Location of Nearest Hospital' value={generalInfo?.location.location_of_nearest_hospital} classNameWrap='flex-1' />
              <Item label='Emergency Assembly Point' value={generalInfo?.location.emergency_assembly_point} classNameWrap='flex-1' />
            </View>
          </View>

        </>
      }
    </View>
  )
}