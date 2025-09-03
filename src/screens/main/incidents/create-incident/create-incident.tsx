import Header from '@components/header'
import Steps from '@components/steps'
import { SafeAreaView, ScrollView } from '@components/ui'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { View } from 'react-native'
import { IncidentSteps, useIncidentContext } from '../context'
import StepAction from './steps/step-action'
import StepGeneralInformation from './steps/step-general-info'
import StepIncident from './steps/step-incident'
import StepSignOff from './steps/step-sign-off'
import StepWitness from './steps/step-witness'
import { useRoute } from '@react-navigation/native'


const steps = {
  [IncidentSteps.General]: 'General',
  [IncidentSteps.Incident]: 'Incident',
  [IncidentSteps.Action]: 'Action',
  [IncidentSteps.Witness]: 'Witness',
  [IncidentSteps.SignOff]: 'Sign off',
}

export default function CreateIncident() {
  const editingMode = useRoute().params?.editingMode as boolean
  const { incident: { selectedIndex, enableScroll, completedSteps, generalInfo }, setIncident } = useIncidentContext();
  const renderSteps = () => {
    switch (selectedIndex) {
      case IncidentSteps.General:
        return <StepGeneralInformation editingMode={editingMode} />
      case IncidentSteps.Incident:
        return <StepIncident editingMode={editingMode} />
      case IncidentSteps.Action:
        return <StepAction editingMode={editingMode} />
      case IncidentSteps.Witness:
        return <StepWitness editingMode={editingMode} />
      case IncidentSteps.SignOff:
        return <StepSignOff editingMode={editingMode} />
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
        <Header title={generalInfo?.siteLocation.site_code || 'New Incident'} isBack onCustomBack={onBack} />
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