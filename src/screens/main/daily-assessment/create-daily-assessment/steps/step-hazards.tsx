import { Button, MediaForm, SelectOption, SelectRating, YesNoForm } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';
import Title from '@components/title';

export interface HazardForm {
  description?: string;
  likelihood?: string;
  consequence?: string;
  initialRiskRating?: string;
  controlMeasure?: string;
  residualRiskRating?: string;
}
const formSchema = yup.object().shape({
  description: yup.string().notRequired(),
  likelihood: yup.string().notRequired(),
  consequence: yup.string().notRequired(),
  initialRiskRating: yup.string().notRequired(),
  controlMeasure: yup.string().notRequired(),
  residualRiskRating: yup.string().notRequired(),
  haveHazards: yup.boolean().notRequired(),
});

export default function StepHazards() {
  const { setAssessment, assessment: { completedSteps } } = useAssessmentContext()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.General }))
  }

  const onSubmit = (form: HazardForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.Hazards, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      hazard: form,
      selectedIndex: DailyAssessmentSteps.FirstAid,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <View className=' mt-6 gap-y-8'>
      <View className=' bg-white p-6 rounded-[20px] gap-y-8'>
        <View className='flex-row items-center gap-x-6   '>
          <TextInput
            classNameWrap='w-[65%]'
            errors={errors}
            control={control}
            name='methodStatement'
            value='SWMS-001: NSW TRANSDEV LVR PYRMONT  '
            className='text-[#4A4646]'
            label='Safe Work Method Statement'
            disabled
          />
          <Button
            label='Check SWMS'
            className='flex-1'
          />
        </View>
        <YesNoForm
          isRadio
          control={control}
          name='haveHazards'
          setValue={setValue}
          label='Are there any additional site hazards?'
        />
      </View>
      {/* Hazard */}
      <View className='p-6 rounded-[20px] bg-white gap-y-6'>
        <Title label='Hazard 1' />
        <TextInput
          errors={errors}
          control={control}
          name='description'
          label='Please describe the hazard'
          placeholder='Describe the hazard........'
          multiline
          hasVoice
        />
        <MediaForm
          isRadio
          control={control}
          name='photos'
          setValue={setValue}
          label='Photos'
        />
        <SelectOption
          control={control}
          setValue={setValue}
          classNameWrap='mt-6'
          name='likelihood'
          label='What is its likelihood?'
        />
        <TextInput
          errors={errors}
          control={control}
          name='consequence'
          label='What are the consequences'
          placeholder='Describe the consequences..'
          multiline
        />
        <SelectRating
          control={control}
          setValue={setValue}
          name='initialRiskRating'
          label='Initial Risk Rating'
        />
        <TextInput
          classNameWrap='mt-6'
          errors={errors}
          control={control}
          name='measure'
          label='What are the control measures?'
          placeholder='Describe the control measures....'
          multiline
        />
        <SelectRating
          control={control}
          setValue={setValue}
          name='residualRiskRating'
          label='What is its likelihood?'
        />
      </View>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Save' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}