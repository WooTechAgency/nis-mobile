import Header from '@components/header'
import { SafeAreaView, ScrollView } from '@components/ui'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { DailyAssessmentSteps, useAssessmentContext } from '../context'
import StepGeneralInformation from './steps/step-general-info'
import StepHazards from './steps/step-hazards'
import StepFirstAid from './steps/step-first-aid'
import StepCheckList from './steps/step-checklist'
import StepSigning from './steps/step-signing'
import { goBack } from '@routes/navigationRef'


const steps = {
  [DailyAssessmentSteps.General]: 'General',
  [DailyAssessmentSteps.Hazards]: 'Hazards',
  [DailyAssessmentSteps.FirstAid]: 'First Aid',
  [DailyAssessmentSteps.CheckList]: 'Check list',
  [DailyAssessmentSteps.Signing]: 'Signing',
}

export default function CreateDailyAssessment() {
  const { assessment, setAssessment } = useAssessmentContext();

  const renderSteps = () => {
    switch (assessment?.selectedIndex) {
      case DailyAssessmentSteps.General:
        return <StepCheckList />
      case DailyAssessmentSteps.Hazards:
        return <StepHazards />
      case DailyAssessmentSteps.FirstAid:
        return <StepFirstAid />
      case DailyAssessmentSteps.CheckList:
        return <StepCheckList />
      case DailyAssessmentSteps.Signing:
        return <StepSigning />
      default:
        return <View />
    }
  }

  const onBack = () => {
    if (assessment?.selectedIndex === DailyAssessmentSteps.General) {
      goBack()
    } else {
      setAssessment((prev) => ({
        ...prev!,
        selectedIndex: prev!.selectedIndex - 1,
      }));
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header title='DSRA-001' isBack onCustomBack={onBack} />
        <View className='flex-row self-center mt-4'>
          {Object.entries(steps).map(([key, value]) => {
            const selected = key === String(assessment?.selectedIndex)
            const lastItem = key === String(DailyAssessmentSteps.Signing)
            return (
              <View key={key} className='flex-row items-center'>
                <View className=' items-center'>
                  <View className={`w-10 h-10 rounded-full border justify-center items-center ${selected && 'border-primary'}`}>
                    <Text className={`${selected && 'text-primary'}`}>{key}</Text>
                  </View>
                  <Text className='mt-1'>{value}</Text>
                </View>
                {!lastItem && <View className='h-[1px] w-[60px] bg-red mx-4' />}
              </View>
            )
          })}
        </View>
        {renderSteps()}
      </ScrollView>
    </SafeAreaView>

  )
}