import Header from '@components/header';
import { SafeAreaView, ScrollView, View, Wrapper } from '@components/ui';
import { useAppSelector } from '@hooks/common';
import React from 'react';
import RequestToUpdate from '../components/request-to-update';
import { useGetCertificates } from '@services/hooks/certificate/useGetCertificate';


export default function CertificateList() {
  const { userInfo } = useAppSelector((state) => state.authentication)
  const { data: certificates, isLoading } = useGetCertificates()

  return (
    <SafeAreaView className=''>
      <ScrollView >
        <Header title='Certificate' isBack={false} />
        <Wrapper className='mt-[0px]'>
          <RequestToUpdate />
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  )
}