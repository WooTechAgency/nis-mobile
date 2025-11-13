import Header from '@components/header';
import { SafeAreaView, ScrollView, View, Wrapper } from '@components/ui';
import { useAppSelector } from '@hooks/common';
import React from 'react';
import RequestToUpdate from '../components/list-jobs';
import ListJobs from '../components/list-jobs';
import { useGetJobs } from '@services/hooks/job/useGetJobs';


export default function Jobs() {
  const { userInfo, } = useAppSelector((state) => state.authentication)
  const { data: jobs, isLoading } = useGetJobs()

  return (
    <SafeAreaView className=''>
      <ScrollView >
        <Header title='Jobs' isBack={false} />
        <Wrapper className='mt-[0px]'>
          <ListJobs />
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  )
}