import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@components/ui'
import { DailyAssessmentSteps, useAssessmentContext } from '../../context'

export default function StepFirstAid() {
  const { setAssessment } = useAssessmentContext()
  const onSubmit = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.CheckList })) // Assuming 3 is the index for the next step
  }
  return (
    <View className='self-center mt-6'>
      <Text>Are there any additional site hazards?</Text>
      <Button label='Next' onPress={onSubmit} />
    </View>
  )
}