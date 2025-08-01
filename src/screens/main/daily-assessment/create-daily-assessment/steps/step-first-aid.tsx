import { Button, SelectOption, SelectRating, YesNoForm } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';

export interface FirstAidForm {
  name?: string;
  firstAidLocation?: string;
  hospitalLocation?: string;
  assemblyPoint?: string;
}
const formSchema = yup.object().shape({
  name: yup.string().notRequired(),
  firstAidLocation: yup.string().notRequired(),
  hospitalLocation: yup.string().notRequired(),
  assemblyPoint: yup.string().notRequired(),
  haveFirstAid: yup.boolean().notRequired(),
});

export default function StepFirstAid() {
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
    setAssessment((prev) => ({ ...prev, selectedIndex: 1 }))

  }
  const onSubmit = (form: FirstAidForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.FirstAid, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      firstAid: form,
      selectedIndex: DailyAssessmentSteps.CheckList,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <View className=' mt-6'>
      {/* <View className='self-center'>
        <Text className='text-[25px] font-semibold mt-8'>Are there any first aid required??</Text>
        <YesNoForm
          control={control}
          name='haveFirstAid'
          setValue={setValue}
        />
      </View> */}
      {/* Hazard */}
      <Text className='text-[25px] font-semibold'>{'First Aid Facilities'}</Text>
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='name'
        label='Name of on-site First Aider'
        placeholder='Enter the name of the first aider...'
      />
      <TextInput
        control={control}
        setValue={setValue}
        classNameWrap='mt-6'
        name='firstAidLocation'
        label='First Aid Box Location'
        placeholder='First Aid Box Location'
      />
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='hospitalLocation'
        label='Location of Nearest Hospital'
        placeholder='Location of Nearest Hospital'
      />
      <Text className='text-[25px] font-semibold mt-8'>{'Emergency Assembly Point'}</Text>
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='assemblyPoint'
        label='Assemply Point'
        placeholder='Assemply Point'
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Save' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}