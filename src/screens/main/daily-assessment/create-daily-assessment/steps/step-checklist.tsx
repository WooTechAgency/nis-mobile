import { Button, CheckList, SelectOption, SelectRating, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';

export interface CheckListForm {
  checklist?: string[];
}
const formSchema = yup.object().shape({
  checklist: yup.array().notRequired(),
});

export default function StepCheckList() {
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
  const onSubmit = (form: CheckListForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.FirstAid, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      checkList: form,
      selectedIndex: DailyAssessmentSteps.Signing,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <>
      <Wrapper className='gap-y-6' >
        <Text className='text-[25px] font-semibold'>{'Team Leader Pre-start Check List'}</Text>
        <CheckList
          errors={errors}
          control={control}
          name='checklist'
          setValue={setValue}
        />


      </Wrapper>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Save' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </>
  )
}