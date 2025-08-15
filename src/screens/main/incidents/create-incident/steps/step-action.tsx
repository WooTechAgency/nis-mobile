import Title from '@components/title';
import { Button, CheckboxDescriptionForm, Wrapper } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';

export interface ActionForm {
  firstAid?: boolean;
  firstAidDes?: string;

}
const formSchema = yup.object().shape({
  firstAid: yup.boolean().notRequired(),
  firstAidDes: yup.string().notRequired(),
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
    <Wrapper className=''>
      <View className='gap-y-4'>
        <Title label='Immediate Action Taken' className='text-base' />
        <CheckboxDescriptionForm
          setValue={setValue}
          errors={errors}
          control={control}
          checkboxName='firstAid'
          label='First aid administered'
          descriptionName='firstAidDes'
          labelDescription='Describe action taken'
          placeholderDescription='Describe the action taken'
        />

      </View>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Next' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </Wrapper>
  )
}