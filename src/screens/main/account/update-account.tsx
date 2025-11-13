import Header from '@components/header';
import { Button, SafeAreaView, ScrollView, View, Wrapper } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { QUERY_KEY } from '@constants/keys.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks/common';
import { showSuccess } from '@lib/toast';
import { goBack } from '@routes/navigationRef';
import { useGetCurrentUser } from '@services/hooks/useGetCurrentUser';
import { updateUserApi } from '@services/user.service';
import { setUserInfo } from '@store/slices/authenticationSlice';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AccountLogo from './components/account-logo';
import UpdateAccountViewIpad from './components/ipad/update-account-view';
import UpdateAccountViewIphone from './components/iphone/update-account-view';
import { isIpad } from '@constants/app.constants';


interface Form {
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
}
const formSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  company: yup.string().notRequired(),
  role: yup.string().notRequired(),
  phone: yup.string()
    .notRequired()
    .test('phone-format', 'Only digits and at most one +', function (value) {
      if (!value) return true; // Allow empty values since it's not required
      const phoneRegex = /^\+?[0-9]+$/;
      const plusCount = (value.match(/\+/g) || []).length;
      return phoneRegex.test(value) && plusCount <= 1;
    }),
  email: yup.string().notRequired(),
});

const ParentView = isIpad ? UpdateAccountViewIpad : UpdateAccountViewIphone;

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
    <SafeAreaView className='bg-neutral15  sm:bg-transparent px-5 sm:px-6'>
      <ParentView userInfo={userInfo} control={control} errors={errors} handleSubmit={handleSubmit(onUpdateProfile)} />
      <Loading loading={loading} />
    </SafeAreaView>
  )
}