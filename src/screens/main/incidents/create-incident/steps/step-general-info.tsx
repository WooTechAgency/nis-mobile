import Title from '@components/title';
import { Button, Wrapper } from '@components/ui';
import { DatePickerInput } from '@components/ui/DatePickerInput';
import { DropdownPicker } from '@components/ui/DropdownPicker';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@hooks/common';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useGetSites } from '@services/hooks/useGetSites';
import { useGetUsers } from '@services/hooks/useGetUsers';
import { ISite } from '@services/site.service';
import { IUser } from '@services/user.service';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { useUpsertIncident } from '../../useUpsertIncident';
import { rowClsIncident } from '../../config.incident';
export interface GeneralForm {
  company?: string | null
  dateOfReport?: Date | null
  completedBy?: string | null
  role?: string | null
  dateOfIncident: Date
  timeOfIncident: Date
  siteLocation: ISite
  supervisor: IUser
}

const formSchema = yup.object().shape({
  company: yup.string().notRequired(),
  dateOfReport: yup.date().notRequired(),
  completedBy: yup.string().notRequired(),
  role: yup.string().notRequired(),
  dateOfIncident: yup.date().required('Date of Incident is required'),
  timeOfIncident: yup.date()
    .required('Time of Incident is required')
    .test('not-future-time', 'Time of Incident cannot be in the future', function (value) {
      const { dateOfIncident } = this.parent;
      if (!value || !dateOfIncident) return true;

      const selectedDate = new Date(dateOfIncident);
      const selectedTime = new Date(value);
      const now = new Date();

      // Check if the selected date is today
      const isToday = selectedDate.toDateString() === now.toDateString();

      if (isToday) {
        // If date is today, time cannot be greater than current time
        return selectedTime <= now;
      }

      return true;
    }),
  siteLocation: yup.mixed<ISite>().required('Site Location is required'),
  supervisor: yup.mixed<IUser>().required('Supervisor on Site is required'),
});
export default function StepGeneralInformation({ editingMode }: { editingMode: boolean }) {
  const { setIncident, incident: { completedSteps, generalInfo } } = useIncidentContext();
  const { userInfo } = useAppSelector((state) => state.authentication)
  const { data: sites } = useGetSites()
  const { data: users } = useGetUsers()
  const { upsertIncident } = useUpsertIncident()

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: 'National Installation Solutions (NIS)',
      completedBy: userInfo?.full_name,
      dateOfReport: new Date(),
      role: userInfo?.role.name,
      ...generalInfo
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const dateOfIncident = watch('dateOfIncident');
  const timeOfIncident = watch('timeOfIncident');

  // Re-validate timeOfIncident when dateOfIncident changes (only if timeOfIncident has value)
  useEffect(() => {
    if (dateOfIncident && timeOfIncident) {
      trigger('timeOfIncident');
    }
  }, [dateOfIncident, trigger, timeOfIncident]);

  const onSubmit = (form: GeneralForm) => {
    const newCompletedSteps = new Set<number>([IncidentSteps.General, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      generalInfo: form,
      selectedIndex: IncidentSteps.Incident,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.PreviewIncident)
    upsertIncident({ generalInfo: form, completedSteps: Array.from(newCompletedSteps) })
  }

  return (
    <Wrapper>
      <Title label='General' className='text-base' />
      <View className={rowClsIncident}>
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
      <View className={rowClsIncident}>
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
          label='Role / Position'
          placeholder='Enter role / position'
          disabled
        />
      </View>
      {/* incident detail */}
      <Title label='Incident Detail' className='text-base mt-8' />
      <View className={rowClsIncident}>
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
          label='Time of Incident*'
          wrapCls="flex-1"
          setValue={setValue}
          name={`timeOfIncident`}
          control={control}
          mode='time'
          placeholder="--:--"
          errors={errors}
        />
      </View>
      <View className={rowClsIncident}>
        <DropdownPicker
          classNameWrap='flex-1'
          setValue={setValue}
          control={control}
          name='siteLocation'
          label='Site Location*'
          placeholder='Select Site Location'
          listValue={sites}
          errors={errors}
          dropdownPosition='top'
        />
        <DropdownPicker
          classNameWrap='flex-1'
          setValue={setValue}
          control={control}
          name='supervisor'
          label='Supervisor on Site*'
          placeholder='Enter supervisor on Site'
          listValue={users}
          errors={errors}
          dropdownPosition='top'
        />
      </View>
      <Button
        className='mt-6'
        label={editingMode ? 'Save' : 'Next'}
        onPress={handleSubmit(onSubmit)}
      />
    </Wrapper>
  )
}