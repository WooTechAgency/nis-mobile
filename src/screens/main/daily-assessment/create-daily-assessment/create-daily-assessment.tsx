import Header from '@components/header'
import Steps from '@components/steps'
import { SafeAreaView, ScrollView } from '@components/ui'
import { useRoute } from '@react-navigation/native'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { View } from 'react-native'
import { DailyAssessmentSteps, useAssessmentContext } from '../context'
import StepCheckList from './steps/step-checklist'
import StepFirstAid from './steps/step-first-aid'
import StepHazards from './steps/step-hazards'
import StepSignOff from './steps/step-sign-off'
import StepGeneralInformation from './steps/step-general-info'


const steps = {
  [DailyAssessmentSteps.General]: 'General',
  [DailyAssessmentSteps.Hazards]: 'Hazards',
  [DailyAssessmentSteps.FirstAid]: 'First Aid',
  [DailyAssessmentSteps.CheckList]: 'Check list',
  [DailyAssessmentSteps.Signing]: 'Signing',
}

export default function CreateDailyAssessment() {
  const editingMode = useRoute().params?.editingMode as boolean
  const { assessment: { selectedIndex, enableScroll, completedSteps, generalInfo }, setAssessment } = useAssessmentContext();

  const renderSteps = () => {
    switch (selectedIndex) {
      case DailyAssessmentSteps.General:
        return <StepGeneralInformation editingMode={editingMode} />
      case DailyAssessmentSteps.Hazards:
        return <StepHazards editingMode={editingMode} />
      case DailyAssessmentSteps.FirstAid:
        return <StepFirstAid editingMode={editingMode} />
      case DailyAssessmentSteps.CheckList:
        return <StepCheckList editingMode={editingMode} />
      case DailyAssessmentSteps.Signing:
        return <StepSignOff editingMode={editingMode} />
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
        <Header title={generalInfo?.location.site_code || 'New DSRA'} isBack onCustomBack={onBack} />
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