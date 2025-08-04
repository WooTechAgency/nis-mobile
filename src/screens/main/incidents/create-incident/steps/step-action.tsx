import { Button } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';

export interface ActionForm {
  other?: string;

}
const formSchema = yup.object().shape({
  other: yup.string().notRequired(),
});

export default function StepAction() {
  const { setIncident, incident: { completedSteps } } = useIncidentContext()
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
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.General }))
  }

  const onSubmit = (form: ActionForm) => {
    const newCompletedSteps = new Set([IncidentSteps.Action, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      action: form,
      selectedIndex: IncidentSteps.Witness,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <View className=' mt-6'>
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='other'
        label='Other:'
        placeholder='Enter other'
        multiline
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Next' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}