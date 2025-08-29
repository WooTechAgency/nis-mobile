import { Button, CheckList, Wrapper } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { TeamLeaderCheckList } from '../../config.assessment';
import { DailyAssessmentSteps, useAssessmentContext } from '../../context';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';

export interface CheckListForm {
  checklist?: string[];
}
const formSchema = yup.object().shape({
  checklist: yup.array().required('You must tick all checkboxes').length(TeamLeaderCheckList.length, 'You must tick all checkboxes'),
});

export default function StepCheckList({ editingMode }: { editingMode: boolean }) {
  const { setAssessment, assessment: { completedSteps, checkList } } = useAssessmentContext()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      checklist: checkList?.checklist
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.FirstAid }))

  }
  const onSubmit = (form: CheckListForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.FirstAid, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      checkList: form,
      selectedIndex: DailyAssessmentSteps.Signing,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.Preview)
  }

  return (
    <>
      <Wrapper className='gap-y-6' >
        <Text className='text-[25px] font-semibold'>{'Team Leader Pre-start Check List'}</Text>
        <CheckList
          errors={errors}
          control={control}
          name='checklist'
          setValue={setValue}
          listValue={TeamLeaderCheckList}
        />
      </Wrapper>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label={editingMode ? 'Save' : 'Next'} onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </>
  )
}