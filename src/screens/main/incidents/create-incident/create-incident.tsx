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


const steps = {
  [IncidentSteps.General]: 'General',
  [IncidentSteps.Incident]: 'Incident',
  [IncidentSteps.Action]: 'Action',
  [IncidentSteps.Witness]: 'Witness',
  [IncidentSteps.SignOff]: 'Sign off',
}

export default function CreateIncident() {
  const { incident: { selectedIndex, enableScroll, completedSteps }, setIncident } = useIncidentContext();
  console.log('completedSteps ', completedSteps)
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
        <View className='flex-row self-center mt-4'>
          {Object.entries(steps).map(([key, value]) => {
            const selected = key === String(selectedIndex)
            const lastItem = key === String(IncidentSteps.SignOff)
            const completed = completedSteps?.includes(Number(key))
            return (
              <View key={key} className='flex-row items-center'>
                <View className=' items-center'>
                  <View className={`w-10 h-10 rounded-full border justify-center items-center ${completed && 'bg-primary border-0'} ${selected && 'border-primary'}`}>
                    <Text className={`${completed && 'text-white'} ${selected && 'text-primary'}`}>{key}</Text>
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