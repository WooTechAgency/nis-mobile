import { Button } from '@components/ui';
import { DatePickerInput } from '@components/ui/DatePickerInput';
import { DropdownPicker } from '@components/ui/DropdownPicker';
import { TextInput } from '@components/ui/TextInput';
import { shadowStyle } from '@constants/config.constants';
import { IDropdown } from '@constants/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@hooks/common';
import { useGetSites } from '@services/hooks/useGetSites';
import { ISite } from '@services/site.service';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useUpsertDailyAssessment } from '../../useUpsertDailyAessment';
import { ROLE_ID } from '@constants/app.constants';
import { useGetUsersByRole } from '@services/hooks/useGetUsers';
import { IUser } from '@services/authentication.service';

export const currentEmploymentStatus = [
  { value: 1, label: 'Full time' },
  { value: 2, label: 'Part time' },
];

export interface GeneralForm {
  location: ISite & IDropdown
  date: Date
  leader: IUser & IDropdown
  project: string
  contractor: string
  methodStatement: string
  description: string
}

const formSchema = yup.object().shape({
  location: yup.object().required('Location is required'),
  date: yup.date().required('Date is required'),
  leader: yup.object().required('Site team leader is required'),
  project: yup.string().required('Project is required'),
  contractor: yup.string().required('Principal contractor is required'),
  methodStatement: yup.string().required('Method statement is required'),
  description: yup.string().required('Description is required'),
});
export default function StepGeneralInformation({ editingMode }: { editingMode: boolean }) {
  const { setAssessment, assessment: { completedSteps, generalInfo } } = useAssessmentContext();
  const { userInfo } = useAppSelector(state => state.authentication)
  const { upsertDailyAssessment } = useUpsertDailyAssessment()
  const { data: leaders } = useGetUsersByRole(ROLE_ID.TEAM_LEADER)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: generalInfo?.location,
      date: generalInfo?.date || new Date(),
      leader: generalInfo?.leader || { value: userInfo?.id, label: userInfo?.full_name },
      project: generalInfo?.project,
      contractor: generalInfo?.contractor,
      methodStatement: generalInfo?.methodStatement,
      description: generalInfo?.description
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const { data: sites } = useGetSites()


  const onSubmit = (form: GeneralForm) => {
    console.log('form ', form)
    const newCompletedSteps = new Set<number>([DailyAssessmentSteps.General, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      generalInfo: form,
      selectedIndex: DailyAssessmentSteps.Hazards,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.DailyAssessmentPreview)
    upsertDailyAssessment({ generalInfo: form, completedSteps: Array.from(newCompletedSteps) })
  }

  const onSelectSite = (site: ISite) => {
    setValue('methodStatement', site.swms.swms_name, { shouldValidate: true })
  }

  return (
    <View className='mt-8 px-6 pb-6 pt-5 bg-white rounded-[20px]' style={shadowStyle}>
      <Text className='text-[25px] font-semibold'>General</Text>
      <DropdownPicker
        classNameWrap='mt-6 z-50'
        setValue={setValue}
        control={control}
        name='location'
        label='Site Location*'
        placeholder="Select site location"
        listValue={sites}
        onSelectCallback={onSelectSite}
        errors={errors}
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
        disabled
      />
      <DropdownPicker
        classNameWrap='mt-6 z-40'
        setValue={setValue}
        control={control}
        name='leader'
        label='Site Team Leader*'
        placeholder="Select site team leader"
        listValue={leaders}
        errors={errors}
        isRerender
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
        label='Principal Contractor*'
        placeholder='Enter principal contractor'
      />
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='methodStatement'
        label='Safe Work Method Statement'
        placeholder='Safe Work Method Statement'
        disabled
      />

      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='description'
        label='Description of Work*'
        placeholder='Enter description of work'
        multiline
      />
      <Button
        className='mt-6'
        label={editingMode ? 'Save' : 'Next'}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}