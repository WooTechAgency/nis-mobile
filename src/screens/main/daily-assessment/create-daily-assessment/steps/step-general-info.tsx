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

export interface GeneralForm {
  location: string
  date: Date
  leader: string
  project: string
  contractor: string
  methodStatement: object
  description: string
}

const formSchema = yup.object().shape({
  location: yup.string().required('Location is required'),
  date: yup.date().required('Date is required'),
  leader: yup.object().required('Site team leader is required'),
  project: yup.string().required('Project is required'),
  contractor: yup.string().required('Principal contractor is required'),
  methodStatement: yup.object().required('Method statement is required'),
  description: yup.string().required('Description is required'),
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

  const onSubmit = (form: GeneralForm) => {
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
        label='Date'
        wrapCls="mt-6"
        setValue={setValue}
        name={`date`}
        control={control}
        mode="date"
        placeholder="Date"
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
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='project'
        label='Project'
        placeholder='Enter project'
      />
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='contractor'
        label='Principal Contractor'
        placeholder='Enter principal contractor'
      />
      <DropdownPicker
        classNameWrap='mt-6'
        setValue={setValue}
        control={control}
        name='methodStatement'
        label='Safe Work Method Statement'
        placeholder="Select site team leader"
        listValue={currentEmploymentStatus}
      />
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='description'
        label='Description of Work'
        placeholder='Enter description of work'
        multiline
      />
      <Button
        className='mt-6'
        label='Next'
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}