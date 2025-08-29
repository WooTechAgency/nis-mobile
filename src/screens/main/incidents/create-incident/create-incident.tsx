import Header from '@components/header'
import { SafeAreaView, ScrollView } from '@components/ui'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { Text, View } from 'react-native'
import { IncidentSteps, useIncidentContext } from '../context'
import StepGeneralInformation from './steps/step-general-info'
import StepIncident from './steps/step-incident'
import StepAction from './steps/step-action'
import StepWitness from './steps/step-witness'
import StepSignOff from './steps/step-sign-off'
import Steps from '@components/steps'


const steps = {
  [IncidentSteps.General]: 'General',
  [IncidentSteps.Incident]: 'Incident',
  [IncidentSteps.Action]: 'Action',
  [IncidentSteps.Witness]: 'Witness',
  [IncidentSteps.SignOff]: 'Sign off',
}

export default function CreateIncident() {
  const { incident: { selectedIndex, enableScroll, completedSteps }, setIncident } = useIncidentContext();
  const renderSteps = () => {
    switch (selectedIndex) {
      case IncidentSteps.General:
        return <StepGeneralInformation />
      case IncidentSteps.Incident:
        return <StepIncident />
      case IncidentSteps.Action:
        return <StepAction />
      case IncidentSteps.Witness:
        return <StepWitness />
      case IncidentSteps.SignOff:
        return <StepSignOff />
      default:
        return <View />
    }
  }

  const onBack = () => {
    if (selectedIndex === IncidentSteps.General) {
      goBack()
    } else {
      setIncident((prev) => ({
        ...prev!,
        selectedIndex: prev!.selectedIndex - 1,
      }));
    }
  }

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={enableScroll}>
        <Header title='IR001' isBack onCustomBack={onBack} />
        <Steps
          classNameWrap='mt-4'
          steps={steps}
          selectedIndex={selectedIndex}
          completedSteps={completedSteps}
          lastItemKey={IncidentSteps.SignOff}
        />
        {renderSteps()}
      </ScrollView>
    </SafeAreaView>

  )
}