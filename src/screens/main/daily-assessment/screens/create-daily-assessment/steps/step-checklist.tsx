import { Button, CheckList, Wrapper } from '@components/ui';
import Loading from '@components/ui/Loading';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { GetPreStartChecklist } from '@services/dsra.service';
import { useGetChecklist } from '@services/hooks/dsra/useGetChecklist';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '@constants/colors.constants';
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context';
import { useUpsertDailyAssessment } from '@screens/main/daily-assessment/useUpsertDailyAessment';

export interface CheckListForm {
  checklist?: GetPreStartChecklist[];
}

export default function StepCheckList({ editingMode }: { editingMode: boolean }) {
  const { setAssessment, assessment: { completedSteps, checkList } } = useAssessmentContext()
  const { upsertDailyAssessment } = useUpsertDailyAssessment()
  const { data: checklist, isLoading } = useGetChecklist()

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      checklist: checkList?.checklist || []
    },
    mode: 'onSubmit', // Only validate on submit, not on change/blur
  });

  // Register validation rules dynamically
  useEffect(() => {
    if (checklist && checklist.length > 0) {
      register('checklist', {
        required: 'You must tick all checkboxes',
        validate: (value: GetPreStartChecklist[]) => {
          if (!value || value.length !== checklist.length) {
            return 'You must tick all checkboxes';
          }
          return true;
        }
      });
      // Don't trigger validation on load - only on submit
    }
  }, [checklist, register]);

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
    editingMode && navigate(RouteName.DailyAssessmentPreview)
    upsertDailyAssessment({ checkList: form, completedSteps: Array.from(newCompletedSteps) })
  }

  return (
    <>
      <Wrapper className='gap-y-6' >
        <Text className='text-[25px] font-semibold'>{'Team Leader Pre-start Check List'}</Text>
        {isLoading ?
          <ActivityIndicator size={'large'} color={colors.primary} className='self-center' />
          :
          <CheckList
            errors={errors}
            control={control}
            name='checklist'
            setValue={setValue}
            listValue={checklist}
          />
        }
      </Wrapper>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label={editingMode ? 'Save' : 'Next'} onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </>
  )
}