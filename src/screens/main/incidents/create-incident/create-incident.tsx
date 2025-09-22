import Header from '@components/header'
import Steps from '@components/steps'
import { SafeAreaView, ScrollView } from '@components/ui'
import Loading from '@components/ui/Loading'
import { IncidentModel } from '@lib/models/incident-model'
import { useRoute } from '@react-navigation/native'
import { useRealm } from '@realm/react'
import { goBack } from '@routes/navigationRef'
import { convertModelToIncident } from '@utils/realm.util'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { IncidentSteps, initialIncident, useIncidentContext } from '../context'
import StepAction from './steps/step-action'
import StepGeneralInformation from './steps/step-general-info'
import StepIncident from './steps/step-incident'
import StepSignOff from './steps/step-sign-off'
import StepWitness from './steps/step-witness'

const steps = {
  [IncidentSteps.General]: 'General',
  [IncidentSteps.Incident]: 'Incident',
  [IncidentSteps.Action]: 'Action',
  [IncidentSteps.Witness]: 'Witness',
  [IncidentSteps.SignOff]: 'Sign off',
}

export default function CreateIncident() {
  const realm = useRealm();
  const editingMode = useRoute().params?.editingMode as boolean
  const incidentId = useRoute().params?.incidentId as string
  console.log('incidentId ', incidentId)
  const [loading, setLoading] = useState(false)

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

  const loadIncident = async (incidentId: string) => {
    setLoading(true);
    const incidentInDB = realm.objectForPrimaryKey(IncidentModel, incidentId)
    if (!incidentInDB) return;
    try {
      const incident = convertModelToIncident(incidentInDB)
      setIncident({ ...initialIncident, ...incident });
      setTimeout(() => setLoading(false), 100);
    } catch (err: any) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (incidentId) {
      loadIncident(incidentId)
    }
  }, [incidentId])

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
        {!loading && renderSteps()}
      </ScrollView>
      <Loading loading={loading} />
    </SafeAreaView>

  )
}