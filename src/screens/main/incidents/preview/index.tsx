import Header from '@components/header'
import { Button, SafeAreaView, ScrollView } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import React, { useState } from 'react'
import ActionPreview from './components/action-preview'
import GeneralPreview from './components/general-preview'
import IncidentPreview from './components/incident-preview'
import SignOffPreview from './components/sign-off-preview'
import WitnessPreview from './components/witness-preview'
import { IncidentSteps, useIncidentContext } from '../context'
import { dispatch } from '@routes/navigationRef'
import { StackActions } from '@react-navigation/native'
import { RouteName } from '@routes/types'
import { CreateIncidentRequest, createIncidentApi, createIncidentTypesApi } from '@services/incident.service'
import { convertDDMMYYYY } from '@utils/date.util'
import dayjs from 'dayjs'
import Loading from '@components/ui/Loading'
import { showSuccess } from '@lib/toast'

export default function PreviewIncident() {
  const { incident: { generalInfo, incident, action, witness, singing }, setIncident } = useIncidentContext()
  const [loading, setLoading] = useState(false)
  const [allowEdit, toggleAlowEdit] = useToggle(true)

  const onCustomBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.SignOff }))
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: false }))
  }

  const onSubmitIncident = async () => {
    const payload: CreateIncidentRequest = {
      site_id: generalInfo?.siteLocation?.id || 0,
      date_of_report: dayjs(generalInfo?.dateOfReport).format('YYYY-MM-DD'),
      date_time_of_incident: generalInfo?.timeOfIncident.toString() || '',
      supervisor_on_site: generalInfo?.supervisor.id,
      incident_types: incident?.incidentTypes
        .filter((item) => !!item.description)
        .map((item) => {
          return { incident_type_id: item.id, description: item.description }
        }),
      involved_people: incident?.involvedPersons.map((person) => {
        return {
          name: person?.name,
          role: person?.role,
          email: person.thirdParty ? person.email : undefined,
          phone: person.thirdParty ? person.phoneNumber : undefined,
          third_party: person.thirdParty || false,
          injured: person.injured || false,
          treatment_required: person.injured ? person.treatment : undefined,
        }
      }),
      immediate_actions: action?.actions
        .filter((item) => !!item.description)
        .map((item) => {
          return { immediate_action_id: item.id, description: item.description }
        }),
      witnesses: witness?.witnesses.map((witness) => {
        return {
          ...witness,
          // media: [1,2,3], //TODO
        }
      }),
      signatures: singing?.signees.map((signee) => {
        return {
          name: signee.name,
          role: signee.role.name,
          signature: signee.signature
        }
      })
    }
    try {
      setLoading(true)
      await createIncidentApi(payload)
      showSuccess({ title: 'Create a new incident successfully' })
      // TODO: back ve man nao do

    } finally {
      setLoading(false)
    }
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
          onPress={onSubmitIncident}
        />

      </ScrollView>
      <Loading loading={loading} />
    </SafeAreaView>
  )
}