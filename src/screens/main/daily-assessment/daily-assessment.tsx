import { Button, FlatList, Image, SafeAreaView, ScrollView, Text, View } from '@components/ui'
import { navigate } from '@routes/navigationRef'
import * as yup from 'yup';
import React from 'react'
import DailySite from './components/daily-site'
import Header from '@components/header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '@components/ui/TextInput';
import { images } from '@assets/images';
import { DataTable } from 'react-native-paper';
import { convertDDMMYYYY } from '@utils/date.util';
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
    mode: 'onChange',
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