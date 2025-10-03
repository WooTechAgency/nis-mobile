import Header from '@components/header';
import { SafeAreaView, ScrollView } from '@components/ui';
import Loading from '@components/ui/Loading';
import { SortBy, SortDirection } from '@constants/interface';
import { QUERY_KEY } from '@constants/keys.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@hooks/common';
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
  sort_by: yup.string().notRequired(),
  date: yup.object().notRequired(),
  sort_direction: yup.string().notRequired()
});

export default function DailyAssessmentsList() {
  const { userInfo } = useAppSelector((state) => state.authentication)
  const { control, setValue, watch } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sort_by: SortBy.ID,
      sort_direction: SortDirection.ASC
    }
  });

  const search = watch('search')
  const date = watch('date') as any
  const site = watch('site') as ISite
  const sort_by = watch('sort_by') as string
  const sort_direction = watch('sort_direction') as string

  const debouncedSearch = useDebounce(search, 500)
  const { data: dsra, isLoading, fetchNextPage, hasNextPage, isFetching } = useGetDsras({
    search: debouncedSearch && debouncedSearch?.length > 1 ? debouncedSearch : undefined,
    search_types: 'tablet',
    site_id: site?.id,
    sort_by: sort_by,
    sort_direction: sort_direction || SortDirection.ASC,
    date_from: date?.startDate,
    date_to: date?.endDate,
    author_id: userInfo?.id
  })

  return (
    <SafeAreaView className=''>
      <ScrollView
        queryKey={QUERY_KEY.DSRAS}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      >
        <Header title='Daily Site Risk Assessment' isBack={false} />
        <TodayDailyAssessments />
        <CompleteDailyAssessments
          control={control}
          setValue={setValue}
          dsra={dsra}
          isFetching={isFetching}
        />
      </ScrollView>
      <Loading loading={isLoading} />
    </SafeAreaView>
  )
}