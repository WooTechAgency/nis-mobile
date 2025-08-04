import { Button } from '@components/ui';
import { DatePickerInput } from '@components/ui/DatePickerInput';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';


export interface GeneralForm {
  company: string
  dateOfReport: Date
  completedBy: string
  role: string
  dateOfIncident: Date
  timeOfIncident: Date
  siteLocation: string
  supervisor: string
}

const formSchema = yup.object().shape({
  company: yup.string().notRequired(),
  dateOfReport: yup.date().notRequired(),
  completedBy: yup.string().notRequired(),
  role: yup.string().notRequired(),
  dateOfIncident: yup.date().notRequired(),
  timeOfIncident: yup.date().notRequired(),
  siteLocation: yup.string().notRequired(),
  supervisor: yup.string().notRequired(),
});
export default function StepGeneralInformation() {
  const { setIncident, incident: { completedSteps } } = useIncidentContext();
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
    const newCompletedSteps = new Set<number>([IncidentSteps.General, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      generalInfo: form,
      selectedIndex: IncidentSteps.Incident,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <View className='mt-8'>
      <Text className='text-[25px] font-semibold'>General</Text>
      <View className='flex-row items-center mt-6 gap-x-4'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='company'
          label='Company'
          placeholder='Enter company'
        />
        <DatePickerInput
          label='Date of Report'
          wrapCls="flex-1"
          setValue={setValue}
          name={`dateOfReport`}
          control={control}
          mode="date"
          placeholder="Date"
          errors={errors}
        />
      </View>
      <View className='flex-row items-center mt-6 gap-x-4'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='completedBy'
          label='Completed by'
          placeholder='Enter completed by'
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='role'
          label='Role /  Position'
          placeholder='Enter role / position'
        />
      </View>
      {/* incident detail */}
      <Text className='text-[25px] font-semibold mt-8'>General</Text>
      <View className='flex-row items-center mt-6 gap-x-4'>
        <DatePickerInput
          label='Date of Incident'
          wrapCls="flex-1"
          setValue={setValue}
          name={`dateOfIncident`}
          control={control}
          mode="date"
          placeholder="Date"
          errors={errors}
        />
        <DatePickerInput
          label='Time of Incident'
          wrapCls="flex-1"
          setValue={setValue}
          name={`timeOfIncident`}
          control={control}
          mode="date"
          placeholder="Date"
          errors={errors}
        />
      </View>
      <View className='flex-row items-center mt-6 gap-x-4'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='siteLocation'
          label='Site Location *'
          placeholder='Enter site location'
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='role'
          label='Supervisor on Site'
          placeholder='Enter supervisor on Site'
        />
      </View>
      <Button
        className='mt-6'
        label='Next'
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}