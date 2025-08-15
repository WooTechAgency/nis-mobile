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
import Steps from '@components/steps'


const steps = {
  [DailyAssessmentSteps.General]: 'General',
  [DailyAssessmentSteps.Hazards]: 'Hazards',
  [DailyAssessmentSteps.FirstAid]: 'First Aid',
  [DailyAssessmentSteps.CheckList]: 'Check list',
  [DailyAssessmentSteps.Signing]: 'Signing',
}

export default function CreateDailyAssessment() {
  const { assessment: { selectedIndex, enableScroll, completedSteps }, setAssessment } = useAssessmentContext();
  console.log('completedSteps ', completedSteps)
  const renderSteps = () => {
    switch (selectedIndex) {
      case DailyAssessmentSteps.General:
        return <StepHazards />
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
    if (selectedIndex === DailyAssessmentSteps.General) {
      goBack()
    } else {
      setAssessment((prev) => ({
        ...prev!,
        selectedIndex: prev!.selectedIndex - 1,
      }));
    }
  }

  return (
    <SafeAreaView className='bg-neutral-100'>
      <ScrollView scrollEnabled={enableScroll}>
        <Header title='DSRA-001' isBack onCustomBack={onBack} />
        <Steps
          classNameWrap='mt-4'
          steps={steps}
          selectedIndex={selectedIndex}
          completedSteps={completedSteps}
          lastItemKey={DailyAssessmentSteps.Signing}
        />
        {renderSteps()}
      </ScrollView>
    </SafeAreaView>

  )
}