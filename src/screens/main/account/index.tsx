import { images } from '@assets/images';
import Header from '@components/header';
import { CommonModal } from '@components/modal';
import { Button, Image, SafeAreaView, ScrollView, Text, View, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { useAppSelector } from '@hooks/common';
import { useToggle } from '@hooks/useToggle';
import { StackActions } from '@react-navigation/native';
import { navigate, navigationRef } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { getCurrentUserApi, logoutApi } from '@services/authentication.service';
import { useGetCurrentUser } from '@services/hooks/useGetCurrentUser';
import { setUserInfo } from '@store/slices/authenticationSlice';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AccountLogo from './components/account-logo';
import { showErrorMessage } from '@utils/functions.util';
import { isIpad } from '@constants/app.constants';

const ParentView = isIpad ? Wrapper : View;

export default function Account() {
  const dispatch = useDispatch()
  const { userInfo: cachedUser } = useAppSelector((state) => state.authentication)
  const { data: latestUser } = useGetCurrentUser()
  const query = useQueryClient()
  const { control, setValue } = useForm();
  const name = useWatch({ control, name: 'name' });

  useEffect(() => {
    if (latestUser || cachedUser) {
      const userInfo = latestUser || cachedUser
      setValue('name', userInfo?.name)
      setValue('role', userInfo?.role?.name)
      setValue('email', userInfo?.email)
      setValue('phone', userInfo?.phone)
      setValue('company', userInfo?.company?.name)
    }
  }, [latestUser, cachedUser])

  const [visibleLogout, toggleVisibleLogout] = useToggle()

  const onChangePassword = () => {
    navigate(RouteName.ChangePassword)
  }

  const onLogout = async () => {
    logoutApi()
    query.clear();
    navigationRef.dispatch(StackActions.replace(RouteName.Login))
    setTimeout(() => {
      dispatch(setUserInfo(null));
    }, 500)

  }

  const checkPermissionAndRedirect = async () => {
    try {
      const user = await getCurrentUserApi()
      console.log('user ', user)
      const permission = user?.role?.permissions?.users?.find((permission) => permission.action === 'edit')
      if (permission) {
        navigate(RouteName.UpdateAccount)
      } else {
        showErrorMessage({ message: 'You do not have permission to perform this action' })
      }
    } catch (error) {
      showErrorMessage({ message: 'You do not have permission to perform this action' })
    }
  }

  return (
    <SafeAreaView className={`bg-white sm:bg-transparent px-5 sm:px-6`}>
      <ScrollView>
        <Header title='Account details' />
        <ParentView className={isIpad ? 'flex-row items-start gap-x-12 mt-[0px]' : 'gap-4'} >
          <AccountLogo name={name} />
          <View className='sm:flex-1'>
            <View className='flex-row items-center justify-between'>
              <Text className='font-semibold text-[16px]'>Profile</Text>
              <Button
                className='w-[135px] h-[36px] flex-row center border border-primary rounded-[8px]'
                onPress={checkPermissionAndRedirect}
              >
                <Image source={images.edit} className='w-8 h-8' />
                <Text className='text-[12px] font-medium'>Edit</Text>
              </Button>
            </View>
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='name'
              label='Name'
              labelOverlap
              disabled
              labelCls='text-neutral70'
              className='text-neutral80'
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='company'
              label='Company'
              labelOverlap
              disabled
              labelCls='text-neutral70'
              className='text-neutral80'
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='role'
              label='Role'
              labelOverlap
              disabled
              labelCls='text-neutral70'
              className='text-neutral80'
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='email'
              label='Email Address'
              labelOverlap
              disabled
              labelCls='text-neutral70'
              className='text-neutral80'
            />
            <TextInput
              classNameWrap='mt-6'
              control={control}
              name='phone'
              label='Phone Number'
              labelOverlap
              disabled
              labelCls='text-neutral70'
              className='text-neutral80'
            />
            <View className='mt-6 sm:flex-row gap-4 sm:gap-6'>
              <Button label='Change Password' onPress={onChangePassword} type='outlined' className='sm:flex-1' classNameLabel='' />
              <Button
                label='Logout'
                onPress={toggleVisibleLogout}
                type='outlined'
                className='sm:flex-1 border-red '
                classNameLabel='text-red '
              />
            </View>
          </View>
        </ParentView>
      </ScrollView>
      <CommonModal
        visible={visibleLogout}
        toggleModal={toggleVisibleLogout}
        title='Log out'
        des='Are you sure you want to log out?'
        btnNegativeText='No'
        btnPositiveText='Yes'
        onPositive={onLogout}
      />
    </SafeAreaView>
  )
}