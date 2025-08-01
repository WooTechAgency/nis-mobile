import { Button, SelectOption, SelectRating, YesNoForm } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';

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
    <View className=' mt-6'>
      <View className='self-center'>
        <View className='w-[468px] h-[60px] justify-center items-center bg-violet rounded-[10px]'>
          <Text className='text-[20px] font-bold text-white'>Check SWMS-001</Text>
        </View>
        <Text className='text-[25px] font-semibold mt-8'>Are there any additional site hazards?</Text>
        <YesNoForm
          control={control}
          name='haveHazards'
          setValue={setValue}
        />
      </View>
      {/* Hazard */}
      <Text className='text-[25px] font-semibold'>{'Hazard 1'}</Text>
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='description'
        label='Please describe the hazard'
        placeholder='Describe the hazard........'
        multiline
      />
      <SelectOption
        control={control}
        setValue={setValue}
        classNameWrap='mt-6'
        name='likelihood'
        label='What is its likelihood?'
      />
      <TextInput
        classNameWrap='mt-6'
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
        classNameWrap='mt-6'
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
        classNameWrap='mt-6'
        name='residualRiskRating'
        label='What is its likelihood?'
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Save' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}