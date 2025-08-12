import Header from '@components/header';
import { Button, Image, SafeAreaView, ScrollView, Text, View } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { shadowStyle } from '@constants/config.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { goBack } from '@routes/navigationRef';
import { useGetCurrentUser } from '@services/hooks/auth/useGetCurrentUser';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AccountLogo from './components/account-logo';
import { images } from '@assets/images';

const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  company: yup.string().required('Company is required'),
  role: yup.string().required('Role is required'),
  email: yup.string().required('Email address is required').email('Invalid email format'),
});

export default function UpdateAccount() {
  const { data: userInfo } = useGetCurrentUser()
  console.log('userInfo ', userInfo)
  const [loading, setLoading] = useState(false)
  const query = useQueryClient()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: userInfo?.name,
      role: userInfo?.role,
      email: userInfo?.email,
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onUpdateProfile = (data: any) => {

  }

  return (
    <SafeAreaView className='bg-neutral-100'>
      <Header
        title='Account details'
        rightComponent={
          <Button className='flex-row items-center ' onPress={goBack}>
            <Image source={images.arrowLeft} className='w-10 h-10' />
            <Text>Back</Text>
          </Button>
        }
      />
      <ScrollView>
        <View
          className='flex-row items-start gap-x-12 mt-6 bg-white p-5 rounded-[20px] '
          style={shadowStyle}
        >
          <AccountLogo />
          <View className='flex-1'>
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='name'
              label='Name'
              labelOverlap
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='company'
              label='Company'
              labelOverlap
              disabled
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='role'
              label='Role'
              labelOverlap
              disabled
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='email'
              label='Email Address'
              labelOverlap
            />
            {/* <TextInput
            classNameWrap='mt-6'
            control={control}
            name='phone'
            label='Phone Number'
            labelOverlap
            disabled
          /> */}
            <View className='mt-6 flex-row gap-x-4'>
              <Button label='Cancel' onPress={goBack} type='outlined' className='flex-1' classNameLabel='' />
              <Button
                label='Save'
                onPress={handleSubmit(onUpdateProfile)}
                className='flex-1'
              />
            </View>
          </View>

        </View>
      </ScrollView>


    </SafeAreaView>
  )
}