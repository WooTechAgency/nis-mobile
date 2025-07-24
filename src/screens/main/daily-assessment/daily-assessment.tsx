import { Button, SafeAreaView, Text, View } from '@components/ui'
import { navigate } from '@routes/navigationRef'
import { ScreenName } from '@routes/types'
import React from 'react'

export default function DailyAssessment() {
  return (
    <SafeAreaView>
      <Text>Daily Site Risk Assessment</Text>
      <Button
        className='mt-4'
        label='Create Daily Assessment'
        onPress={() => navigate(ScreenName.CreateDailyAssessment)}
      />
    </SafeAreaView>
  )
}