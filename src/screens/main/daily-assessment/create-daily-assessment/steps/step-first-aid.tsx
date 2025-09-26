import { Button, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';
import { useUpsertDailyAssessment } from '../../useUpsertDailyAessment';

export interface FirstAidForm {
  name?: string;
  firstAidLocation?: string;
  hospitalLocation?: string;
  assemblyPoint?: string;
}
const formSchema = yup.object().shape({
  name: yup.string().required('Name of on-site First Aider is required'),
  firstAidLocation: yup.string().required('First Aid Box Location is required'),
  hospitalLocation: yup.string().notRequired(),
  assemblyPoint: yup.string().notRequired(),
});

export default function StepFirstAid({ editingMode }: { editingMode: boolean }) {
  const { setAssessment, assessment: { completedSteps, generalInfo, firstAid } } = useAssessmentContext()
  const { upsertDailyAssessment } = useUpsertDailyAssessment()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      name: firstAid?.name,
      firstAidLocation: firstAid?.firstAidLocation,
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Hazards }))

  }
  const onSubmit = (form: FirstAidForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.FirstAid, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      firstAid: form,
      selectedIndex: DailyAssessmentSteps.CheckList,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.DailyAssessmentPreview)
    upsertDailyAssessment({ firstAid: form, completedSteps: Array.from(newCompletedSteps) })
  }

  return (
    <View className='gap-y-6'>
      <Wrapper className='gap-y-6'>
        <Text className='text-[25px] font-semibold'>{'First Aid Facilities'}</Text>
        <TextInput
          errors={errors}
          control={control}
          name='name'
          label='Name of on-site First Aider'
          placeholder='Enter the name of the first aider...'
        />
        <TextInput
          control={control}
          setValue={setValue}
          name='firstAidLocation'
          label='First Aid Box Location'
          placeholder='First Aid Box Location'
        />
        <TextInput
          errors={errors}
          control={control}
          name='hospitalLocation'
          label='Location of Nearest Hospital'
          placeholder='Location of Nearest Hospital'
          disabled
          value={generalInfo?.location.location_of_nearest_hospital}
        />
        <TextInput
          errors={errors}
          control={control}
          name='location'
          label='Location'
          placeholder='Emergency Assembly Point'
          disabled
          value={generalInfo?.location.emergency_assembly_point}
        />
      </Wrapper>
      <View className=' flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label={editingMode ? 'Save' : 'Next'} onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}