import { images } from '@assets/images'
import Header from '@components/header'
import { Button, Image, SafeAreaView, ScrollView } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { dispatch, goBack } from '@routes/navigationRef'
import React from 'react'
import { DailyAssessmentSteps, useAssessmentContext } from './context'
import CheckListPreview from './create-daily-assessment/components/previews/checklist-preview'
import FirstAidPreview from './create-daily-assessment/components/previews/first-aid-preview'
import GeneralPreview from './create-daily-assessment/components/previews/general-preview'
import HazardPreview from './create-daily-assessment/components/previews/hazard-preview'
import SignOffPreview from './create-daily-assessment/components/previews/sign-off-preview'
import { StackActions } from '@react-navigation/native'
import { RouteName } from '@routes/types'

export default function Preview() {
  const { assessment: { generalInfo }, setAssessment } = useAssessmentContext()
  const [allowEdit, toggleAlowEdit] = useToggle(true)

  const onAddHazard = () => {
  }

  const onCustomBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Signing }))
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: false }))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={generalInfo?.location?.site_code || 'New DSRA'}
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
        <GeneralPreview allowEdit={allowEdit} />
        <HazardPreview allowEdit={allowEdit} />
        <FirstAidPreview allowEdit={allowEdit} />
        <CheckListPreview allowEdit={allowEdit} />
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