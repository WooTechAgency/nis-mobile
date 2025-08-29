import Header from '@components/header';
import { SafeAreaView, ScrollView } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import DailySite from './components/daily-site';
import DailySiteRickAssessmentTable from './components/dsra-table';

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
});


export default function DailyAssessment() {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return (
    <SafeAreaView className=''>
      <ScrollView>
        <Header title='Daily Site Risk Assessment' isBack={false} />
        <DailySite />
        {/* table */}
        <DailySiteRickAssessmentTable
          control={control}
        />
      </ScrollView>

    </SafeAreaView>
  )
}