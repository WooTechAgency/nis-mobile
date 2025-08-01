import { Button, SelectOption, SelectRating } from '@components/ui';
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

});

export default function StepFirstAid() {
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

  const [haveHazards, setHaveHazards] = useState(false)

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: 1 }))

  }
  const onSubmit = (form: FirstAidForm) => {
    console.log('dcmmmdsa ', DailyAssessmentSteps.CheckList)
    setAssessment((prev) => ({ ...prev, firstAid: form, selectedIndex: DailyAssessmentSteps.CheckList }))
  }

  return (
    <View className=' mt-6'>
      {/* <View className='self-center'>
    
        <Text className='text-[25px] font-semibold mt-8'>Are there any first aid required??</Text>
        <View className='flex-row self-center gap-x-6 mt-8'>
          <Button
            className='w-[100px] h-[60px] rounded-[10px] justify-center items-center border'
            onPress={() => setHaveHazards(false)}
          >
            <Text className='text-[20px] font-bold'>No</Text>
          </Button>
          <Button
            className='w-[100px] h-[60px] rounded-[10px] justify-center items-center border'
            onPress={() => setHaveHazards(true)}
          >
            <Text className='text-[20px] font-bold'>Yes</Text>
          </Button>
        </View>
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