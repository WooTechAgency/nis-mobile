import Header from '@components/header';
import { Button, Image, SafeAreaView, ScrollView, Text, View, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { shadowStyle } from '@constants/config.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { goBack, navigate } from '@routes/navigationRef';
import { useGetCurrentUser } from '@services/hooks/useGetCurrentUser';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AccountLogo from './components/account-logo';
import { images } from '@assets/images';
import { updateUserApi } from '@services/user.service';
import Loading from '@components/ui/Loading';
import { showSuccess } from '@lib/toast';
import { useAppDispatch, useAppSelector } from '@hooks/common';
import { setUserInfo } from '@store/slices/authenticationSlice';
import { QUERY_KEY } from '@constants/keys.constants';

interface Form {
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
}
const formSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  company: yup.string().notRequired(),
  role: yup.string().notRequired(),
  phone: yup.string()
    .notRequired()
    .test('phone-format', 'Phone number can only contain numbers and one + symbol', function (value) {
      if (!value) return true; // Allow empty values since it's not required
      const phoneRegex = /^\+?[0-9]+$/;
      const plusCount = (value.match(/\+/g) || []).length;
      return phoneRegex.test(value) && plusCount <= 1;
    }),
  email: yup.string().notRequired(),
});

export default function UpdateAccount() {
  const { userInfo: cachedUser } = useAppSelector((state) => state.authentication)

  const { data: userInfo } = useGetCurrentUser()
  const [loading, setLoading] = useState(false)
  const query = useQueryClient()
  const dispatch = useAppDispatch()
  console.log('userInfo ', userInfo)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: userInfo?.first_name,
      lastName: userInfo?.last_name,
      role: userInfo?.role.name,
      phone: userInfo?.phone,
      email: userInfo?.email,
      company: userInfo?.company.name
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });


  const onUpdateProfile = async (data: Form) => {
    if (!userInfo?.id) return;
    try {
      const payload = {
        first_name: data?.firstName?.trim(),
        last_name: data?.lastName?.trim(),
        phone: data?.phone?.trim(),
      }
      setLoading(true);
      const newUserInfo = await updateUserApi(userInfo?.id, payload)
      showSuccess({ title: 'Profile updated successfully!' })
      dispatch(setUserInfo({ ...cachedUser, ...newUserInfo }))
      query.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_USER] })
      goBack()
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className='bg-neutral-100'>
      <Header title='Account details' />
      <ScrollView>
        <Wrapper className='flex-row items-start gap-x-12 mt-[0px] ' >
          <AccountLogo name={userInfo?.full_name || ''} />
          <View className='flex-1'>
            <View className='flex-row mt-6 gap-x-6'>
              <TextInput
                classNameWrap='flex-1'
                control={control}
                name='firstName'
                label='First name'
                errors={errors}
                formatName={true}
                maxLength={50}
              />
              <TextInput
                classNameWrap='flex-1'
                control={control}
                name='lastName'
                label='Last name'
                errors={errors}
                formatName={true}
                maxLength={50}
              />
            </View>
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
              disabled
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='phone'
              label='Phone Number'
              labelOverlap
              keyboardType='phone-pad'
              formatPhone={true}
              errors={errors}
            />
            <View className='mt-6 flex-row gap-x-4'>
              <Button label='Cancel' onPress={goBack} type='outlined' className='flex-1' classNameLabel='' />
              <Button
                label='Save'
                onPress={handleSubmit(onUpdateProfile)}
                className='flex-1'
              />
            </View>
          </View>
        </Wrapper>
      </ScrollView>
      <Loading loading={loading} />
    </SafeAreaView>
  )
}