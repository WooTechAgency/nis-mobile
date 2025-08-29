import { Button, Wrapper } from '@components/ui';
import { DatePickerInput } from '@components/ui/DatePickerInput';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import Title from '@components/title';
import { shadowStyle } from '@constants/config.constants';


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
    mode: 'onSubmit',
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
    <Wrapper>
      <Title label='General' className='text-base' />
      <View className='flex-row items-center mt-6 gap-x-4'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='company'
          label='Company'
          placeholder='Enter company'
          disabled
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
          disabled
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
          disabled
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='role'
          label='Role /  Position'
          placeholder='Enter role / position'
          disabled
        />
      </View>
      {/* incident detail */}
      <Title label='Incident Detail' className='text-base mt-8' />
      <View className='flex-row items-center mt-6 gap-x-6'>
        <DatePickerInput
          label='Date of Incident * '
          wrapCls="flex-1"
          setValue={setValue}
          name={`dateOfIncident`}
          control={control}
          mode="date"
          placeholder="dd/mm/yyyy"
          errors={errors}
        />
        <DatePickerInput
          label='Time of Incident *'
          wrapCls="flex-1"
          setValue={setValue}
          name={`timeOfIncident`}
          control={control}
          mode="date"
          placeholder="dd/mm/yyyy"
          errors={errors}
        />
      </View>
      <View className='flex-row items-center mt-6 gap-x-6'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='siteLocation'
          label='Site Location *'
          placeholder='Select Site Location'
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
        onPress={handleSubmit(onSubmit)}
      />
    </Wrapper>
  )
}