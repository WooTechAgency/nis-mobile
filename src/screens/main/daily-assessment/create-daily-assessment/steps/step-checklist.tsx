import { Button, CheckList, SelectOption, SelectRating } from '@components/ui';
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
  const { setAssessment } = useAssessmentContext()
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
  console.log('dcmmmmm123231')

  const [haveHazards, setHaveHazards] = useState(false)

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: 1 }))

  }
  const onSubmit = (form: CheckListForm) => {
    setAssessment((prev) => ({ ...prev, checkList: form, selectedIndex: DailyAssessmentSteps.Signing }))
  }

  return (
    <View className=' mt-6'>

      <Text className='text-[25px] font-semibold'>{'Team Leader Pre-start Check List'}</Text>
      <CheckList
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='checklist'
        setValue={setValue}
      />

      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Save' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}