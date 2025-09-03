import Header from '@components/header'
import { Button, SafeAreaView, ScrollView } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import React from 'react'
import ActionPreview from './components/action-preview'
import GeneralPreview from './components/general-preview'
import IncidentPreview from './components/incident-preview'
import SignOffPreview from './components/sign-off-preview'
import WitnessPreview from './components/witness-preview'
import { IncidentSteps, useIncidentContext } from '../context'
import { dispatch } from '@routes/navigationRef'
import { StackActions } from '@react-navigation/native'
import { RouteName } from '@routes/types'

export default function PreviewIncident() {
  const { incident: { generalInfo }, setIncident } = useIncidentContext()

  const [allowEdit, toggleAlowEdit] = useToggle(true)

  const onCustomBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.SignOff }))
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: false }))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={generalInfo?.siteLocation.site_code || 'New Incident'}
          isBack
          onCustomBack={onCustomBack}
        />
        <GeneralPreview allowEdit={allowEdit} />
        <IncidentPreview allowEdit={allowEdit} />
        <ActionPreview allowEdit={allowEdit} />
        <WitnessPreview allowEdit={allowEdit} />
        <SignOffPreview allowEdit={allowEdit} />
        <Button
          label={'Submit'}
          className='mt-8'
          onPress={toggleAlowEdit}
        />

      </ScrollView>
    </SafeAreaView>
  )
}