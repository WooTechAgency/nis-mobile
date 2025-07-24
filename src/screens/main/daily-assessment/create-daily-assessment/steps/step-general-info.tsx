import { View, Text } from 'react-native'
import React, { use } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '@components/ui/TextInput';
import { Button } from '@components/ui';
import { DailyAssessment, DailyAssessmentSteps, useAssessmentContext } from '../../context';
import { DropdownPicker } from '@components/ui/DropdownPicker';
import { DatePickerInput } from '@components/ui/DatePickerInput';

export const currentEmploymentStatus = [
  { value: 1, label: 'Full time' },
  { value: 2, label: 'Part time' },
];

interface FormValues {
  location: string
}

const formSchema = yup.object().shape({
  location: yup.string().required('Location is required'),
  leader: yup.object().required('Site team leader is required')
});
export default function StepGeneralInformation() {
  const { setAssessment } = useAssessmentContext();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  console.log('errors ', errors)

  const onSubmit = (form: FormValues) => {
    console.log('form ', form)
    setAssessment((prev) => ({ ...prev, generalInfo: form, selectedIndex: DailyAssessmentSteps.Hazards }))
  }

  return (
    <View className='mt-8'>
      <Text className='text-[25px] font-semibold'>General Information</Text>
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='location'
        label='Site Location'
        placeholder='Enter site location'
      />
      <DatePickerInput
        wrapCls="mt-6"
        className="mt-0"
        setValue={setValue}
        name={`date`}
        control={control}
        mode="date"
        placeholder="Enter date"
        errors={errors}
      />
      <DropdownPicker
        classNameWrap='mt-6'
        setValue={setValue}
        control={control}
        name='leader'
        label='Site Team Leader'
        placeholder="Select site team leader"
        listValue={currentEmploymentStatus}
      />
      <Button
        className='mt-6'
        label='Next'
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}