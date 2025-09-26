import HeaderPreview from '@components/common/header-preview'
import { shadowStyle } from '@constants/config.constants'
import { useToggle } from '@hooks/useToggle'
import { dispatch, goBack } from '@routes/navigationRef'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { PreviewProps } from '@screens/main/incidents/config.incident'
import React from 'react'
import { View } from 'react-native'
import HazardItemPreview from './hazard-item-preview'
import { RouteName } from '@routes/types'
import { StackActions } from '@react-navigation/native'
import { consequenceOptions, likeliHoodOptions, riskRating } from '@screens/main/daily-assessment/config.assessment'

export default function HazardPreview({ allowEdit, dsra }: PreviewProps) {
  const { assessment: { hazard }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: true }))
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Hazards }))
  }

  const hazards = hazard?.hazards || dsra?.hazards.map((item) => ({
    ...item,
    consequenceDes: item.consequence_description,
    controlMeasure: item.control_measure,
    likelihood: likeliHoodOptions.find((option) => option.title === item.likelihood),
    consequence: consequenceOptions.find((option) => option.title === item.consequence),
    initialRiskRating: riskRating.flat().find((option) => option.title === item.initial_risk_rating),
    residualRiskRating: riskRating.flat().find((option) => option.title === item.residual_risk_rating),
    medias: item.media.map((_media) => ({
      uri: _media.url,
    })),
  }))


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