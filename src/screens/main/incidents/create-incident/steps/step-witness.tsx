import { Button } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import Title from '@components/title';

export interface WitnessForm {
  other?: string;
  phone?: string;
  email?: string;

}
const formSchema = yup.object().shape({
  name: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  email: yup.string().notRequired(),
});

export default function StepWitness() {
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

  const onSubmit = (form: WitnessForm) => {
    const newCompletedSteps = new Set([IncidentSteps.Witness, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      witness: form,
      selectedIndex: IncidentSteps.SignOff,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <View className='mt-8'>
      <Title label='Witnesses (if any)' />
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='name'
        label='Name'
        placeholder='Enter name'
      />
      <View className='flex-row items-center gap-x-4 mt-6'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='phone'
          label='Phone'
          placeholder='Enter phone'
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='email'
          label='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='Enter email'
        />
      </View>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Next' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}