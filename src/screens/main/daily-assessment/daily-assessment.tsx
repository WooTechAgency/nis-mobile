import Header from '@components/header';
import { SafeAreaView, ScrollView } from '@components/ui';
import React from 'react';
import * as yup from 'yup';
import DailySite from './components/daily-site';
import DailySiteRickAssessmentTable from './components/dsra-table';

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
});


export default function DailyAssessment() {

  return (
    <SafeAreaView className=''>
      <ScrollView>
        <Header title='Daily Site Risk Assessment' isBack={false} />
        <DailySite />
        <DailySiteRickAssessmentTable />
      </ScrollView>

    </SafeAreaView>
  )
}