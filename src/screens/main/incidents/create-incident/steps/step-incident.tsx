import Title from '@components/title';
import { Button, YesNoForm } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';

export interface IncidentForm {
  thirdParty?: boolean;
  name?: string;
  role?: string;
  injured?: boolean;
  other?: string;
}
const formSchema = yup.object().shape({
  thirdParty: yup.boolean().notRequired(),
  name: yup.string().notRequired(),
  role: yup.string().notRequired(),
  injured: yup.boolean().notRequired(),
  other: yup.string().notRequired(),
});

export default function StepIncident() {
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
    setIncident((prev) => ({ ...prev, selectedIndex: 1 }))

  }
  const onSubmit = (form: IncidentForm) => {
    const newCompletedSteps = new Set([IncidentSteps.Incident, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      incident: form,
      selectedIndex: IncidentSteps.Action,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <View className=' mt-6'>
      {/* Hazard */}
      <Title label='Person(s) Involved' />
      <YesNoForm
        isRadio
        control={control}
        setValue={setValue}
        name='thirdParty'
        label='Third-party?'
        classNameWrap='mt-6'
      />
      <View className='flex-row items-center gap-x-4 mt-6'>
        <TextInput
          control={control}
          setValue={setValue}
          classNameWrap='flex-1'
          name='name'
          label='Name'
          placeholder='Enter name'
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='role'
          label='Role'
          placeholder='Enter role'
        />
      </View>
      <YesNoForm
        isRadio
        control={control}
        setValue={setValue}
        name='injured'
        label='Injured?'
        classNameWrap='mt-6'
      />
      <Button label='Add another person' className='self-start mt-6' />
      <TextInput
        classNameWrap='mt-7'
        errors={errors}
        control={control}
        name='other'
        label='Other:'
        placeholder='Enter other'
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Next' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}