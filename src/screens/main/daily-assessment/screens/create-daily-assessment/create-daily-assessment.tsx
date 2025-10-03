import Header from '@components/header'
import Steps from '@components/steps'
import { SafeAreaView, ScrollView } from '@components/ui'
import Loading from '@components/ui/Loading'
import { DailyAssessmentModel } from '@lib/models/daily-assessment-model'
import { useRoute } from '@react-navigation/native'
import { useRealm } from '@realm/react'
import { goBack } from '@routes/navigationRef'
import { DSRA } from '@services/dsra.service'
import { convertModelToDailyAssessment } from '@utils/realm.util'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { DailyAssessmentSteps, initialAssessment, useAssessmentContext } from '../../context'
import StepCheckList from './steps/step-checklist'
import StepFirstAid from './steps/step-first-aid'
import StepGeneralInformation from './steps/step-general-info'
import StepHazards from './steps/step-hazards'
import StepSignOff from './steps/step-sign-off'


const steps = {
  [DailyAssessmentSteps.General]: 'General',
  [DailyAssessmentSteps.Hazards]: 'Hazards',
  [DailyAssessmentSteps.FirstAid]: 'First Aid',
  [DailyAssessmentSteps.CheckList]: 'Check list',
  [DailyAssessmentSteps.Signing]: 'Signing',
}

export default function CreateDailyAssessment() {
  const editingMode = useRoute().params?.editingMode as boolean
  const assessmentId = useRoute().params?.assessmentId as string
  const dsraData = useRoute().params?.dsraData as DSRA

  const realm = useRealm()
  const { assessment: { selectedIndex, enableScroll, completedSteps, generalInfo }, setAssessment } = useAssessmentContext();
  const [loading, setLoading] = useState(false)

  const renderSteps = () => {
    switch (selectedIndex) {
      case DailyAssessmentSteps.General:
        return <StepGeneralInformation editingMode={editingMode} />
      case DailyAssessmentSteps.Hazards:
        return <StepHazards editingMode={editingMode} dsraData={dsraData} />
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

  const loadDailyAssessment = async (assessmentId: string) => {
    setLoading(true);
    const assessmentInDB = realm.objectForPrimaryKey(DailyAssessmentModel, assessmentId)
    if (!assessmentInDB) return;
    try {
      const assessment = convertModelToDailyAssessment(assessmentInDB)
      setAssessment({ ...initialAssessment, ...assessment });
      setTimeout(() => setLoading(false), 100);
    } catch (err: any) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (assessmentId) {
      loadDailyAssessment(assessmentId)
    }
  }, [assessmentId])

  useEffect(() => {
    return () => {
      setAssessment(initialAssessment)
    }
  }, [])

  return (
    <SafeAreaView className='bg-neutral-100'>
      <ScrollView scrollEnabled={enableScroll}>
        <Header
          title={generalInfo?.location.site_code || dsraData?.site?.site_code || 'New DSRA'}
          isBack
        />
        <Steps
          classNameWrap='mt-4'
          steps={steps}
          selectedIndex={selectedIndex}
          completedSteps={completedSteps}
          lastItemKey={DailyAssessmentSteps.Signing}
        />
        {!loading && renderSteps()}
      </ScrollView>
      <Loading loading={loading} />
    </SafeAreaView>

  )
}