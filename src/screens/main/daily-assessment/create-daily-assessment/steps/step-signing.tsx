import { Signature } from '@components/signature';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';
import { Button } from '@components/ui';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';

function Label({ text }: { text: string }) {
  return (
    <View className='flex-row items-center gap-x-2'>
      <Text style={{ fontSize: 4 }}>⚫</Text>
      <Text>{text}</Text>
    </View>
  )
}

export interface SigningForm {
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

export default function StepSigning() {
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

  const { setAssessment } = useAssessmentContext()

  const onSubmit = (form: SigningForm) => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Signing, singing: form })) // Assuming 3 is the index for the next step

    navigate(RouteName.Preview)
  }

  const onStartSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: false }))
  }

  const onEndSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: true }))
  }

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.CheckList }))
  }

  return (
    <View className=' mt-6'>
      <Text className='text-[25px] font-semibold'>{'First Aid Facilities'}</Text>
      <Text className='mt-4'>By signing below, I acknowledge:  </Text>
      <View className='mt-2 ml-2'>
        <Label text='I am the nominated Site Team Leader. ' />
        <Label text='All staff have participated and understand site the hazards and controls identified within this Daily Site Risk Assessment. ' />
        <Label text='I am responsible for monitoring site hazards, controls and any changes or circumstances that impact on the risk to workers.  ' />
      </View>
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