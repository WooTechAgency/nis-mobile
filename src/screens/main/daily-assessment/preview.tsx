import { images } from '@assets/images'
import Header from '@components/header'
import { Button, Image, SafeAreaView, ScrollView } from '@components/ui'
import Loading from '@components/ui/Loading'
import { QUERY_KEY } from '@constants/keys.constants'
import { DailyAssessmentModel } from '@lib/models/daily-assessment-model'
import { showSuccess } from '@lib/toast'
import { StackActions, useRoute } from '@react-navigation/native'
import { useRealm } from '@realm/react'
import { dispatch, goBack } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { createAssessmentApi, CreateAssessmentRequest } from '@services/dsra.service'
import { useGetDsraDetail } from '@services/hooks/dsra/useGetDsraDetail'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { DailyAssessmentSteps, initialAssessment, useAssessmentContext } from './context'
import CheckListPreview from './create-daily-assessment/components/previews/checklist-preview'
import FirstAidPreview from './create-daily-assessment/components/previews/first-aid-preview'
import GeneralPreview from './create-daily-assessment/components/previews/general-preview'
import SignOffPreview from './create-daily-assessment/components/previews/sign-off-preview'
import HazardPreview from './create-daily-assessment/components/previews/hazard-preview'
import { useAppSelector } from '@hooks/common'

export default function DailyAssessmentPreview() {
  const dsraId = useRoute().params?.dsraId as number

  const realm = useRealm();
  const { assessment: { generalInfo, firstAid, singing, checkList, hazard, id }, setAssessment } = useAssessmentContext()
  const [allowEdit, setAllowEdit] = useState(true)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const { userInfo } = useAppSelector((state) => state.authentication)

  const { data, isLoading } = useGetDsraDetail(dsraId)

  const onAddHazard = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: true }))
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Hazards }))
  }

  const onCustomBack = () => {
    if (data) {
      return goBack();
    }
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Signing }))
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: false }))
  }

  const onSubmit = async () => {
    const payload: CreateAssessmentRequest = {
      site_id: generalInfo?.location?.id || 0,
      date: dayjs(generalInfo?.date).format('YYYY-MM-DD'),
      team_leader: generalInfo?.leader?.id || 0,
      project: generalInfo?.project || '',
      principal_contractor: generalInfo?.contractor || '',
      description_of_work: generalInfo?.description || '',
      site_first_aider_name: firstAid?.name || '',
      first_aid_box_location: firstAid?.firstAidLocation || '',
      pre_start_checklists: checkList?.checklist?.map((item) => item.id) || [],
      hazards: hazard?.hazards?.map((item) => ({
        description: item.description || '',
        likelihood: item.likelihood?.title || '',
        consequence: item.consequence?.title || '',
        consequence_description: item.consequenceDes || '',
        initial_risk_rating: item.initialRiskRating?.title || '',
        control_measure: item.controlMeasure || '',
        residual_risk_rating: item.residualRiskRating?.title,
        media: item.medias?.map((media) => media.id) || [],
      })),
      signatures: [
        {
          name: userInfo?.full_name || '',
          role: userInfo?.role.name || '',
          signature: singing?.teamLeader?.signature || '',
        },
        ...(Array.isArray(singing?.signees)
          ? singing.signees.map((item) => ({
            name: item.name || '',
            role: item.role.name || '',
            signature: item.signature || '',
          }))
          : []),
      ]
    }
    try {
      setLoading(true)
      console.log('payload ', payload)
      await createAssessmentApi(payload)
      showSuccess({ title: 'Create a new daily assessment successfully' })
      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey(DailyAssessmentModel, id || 0));
      });
      setAssessment(initialAssessment)
      dispatch(StackActions.popToTop());
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DSRAS] })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      setAllowEdit(false)
    }
  }, [data])

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={generalInfo?.location?.site_code || data?.site?.site_code || 'New DSRA'}
          isBack
          onCustomBack={onCustomBack}
          rightComponent={
            <Button
              label='Add Hazard'
              type='default'
              style={{ width: 120, height: 36 }}
              onPress={onAddHazard}
              classNameLabel='text-xs font-medium'
              iconButton={<Image source={images.edit} className='w-8 h-8' />}
            />
          }
        />
        <GeneralPreview allowEdit={allowEdit} dsra={data} />
        <HazardPreview allowEdit={allowEdit} dsra={data} />
        <FirstAidPreview allowEdit={allowEdit} dsra={data} />
        <CheckListPreview allowEdit={allowEdit} dsra={data} />
        <SignOffPreview allowEdit={allowEdit} dsra={data} />
        {allowEdit &&
          <Button
            label={'Submit'}
            className='mt-8'
            onPress={onSubmit}
          />
        }
      </ScrollView>
      <Loading loading={loading || isLoading} />
    </SafeAreaView>
  )
}