import { Signature } from '@components/signature';
import Title from '@components/title';
import { Button } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';

export interface SignOffForm {
  teamLeader: {
    signature?: string;
    timestamp?: string;
  };
}

const formSchema = yup.object().shape({
  teamLeader: yup.object({
    signature: yup.string().notRequired(),
    timestamp: yup.string().notRequired()
  })
});

export default function StepSignOff() {
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

  const { setIncident } = useIncidentContext()

  const onSubmit = (form: SignOffForm) => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.SignOff, singing: form })) // Assuming 3 is the index for the next step
    navigate(RouteName.PreviewIncident)
  }

  const onStartSign = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: false }))
  }

  const onEndSign = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: true }))
  }

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Witness }))
  }

  return (
    <View className=' mt-6'>
      <Title label='Sign off' />
      <Signature
        classNameWrap='mt-6'
        name='teamLeader'
        onBegin={onStartSign}
        onEnd={onEndSign}
        control={control}
        setValue={setValue}
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Preview' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}