import Header from '@components/header';
import { SafeAreaView, ScrollView } from '@components/ui';
import Loading from '@components/ui/Loading';
import { SortDirection } from '@constants/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDebounce } from '@hooks/useDebounce';
import { useGetDsras } from '@services/hooks/dsra/useGetDsras';
import { ISite } from '@services/site.service';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CompleteDailyAssessments from '../components/complete-daily-assessments';
import TodayDailyAssessments from '../components/today-daily-assessments';

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
  site: yup.object().notRequired(),
  date: yup.object().notRequired(),
  sort_direction: yup.string().notRequired()
});


export default function DailyAssessmentsList() {
  const { control, setValue, watch } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sort_direction: SortDirection.ASC
    }
  });

  const search = watch('search')
  const date = watch('date') as any
  const site = watch('site') as ISite
  const sort_direction = watch('sort_direction') as string

  const debouncedSearch = useDebounce(search, 500)
  const { data: dsra, isLoading } = useGetDsras({
    search: debouncedSearch && debouncedSearch?.length > 1 ? debouncedSearch : undefined,
    search_types: 'tablet',
    site_id: site?.id,
    sort_by: 'id',
    sort_direction: sort_direction || SortDirection.ASC,
    date_from: date?.startDate,
    date_to: date?.endDate
  })

  return (
    <SafeAreaView className=''>
      <ScrollView>
        <Header title='Daily Site Risk Assessment' isBack={false} />
        <TodayDailyAssessments />
        <CompleteDailyAssessments
          control={control}
          setValue={setValue}
          dsra={dsra}
        />
      </ScrollView>
      <Loading loading={isLoading} />
    </SafeAreaView>
  )
}