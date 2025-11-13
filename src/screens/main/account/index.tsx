import { CommonModal } from '@components/modal';
import { SafeAreaView } from '@components/ui';
import { isIpad } from '@constants/app.constants';
import { useAppSelector } from '@hooks/common';
import { useToggle } from '@hooks/useToggle';
import { StackActions } from '@react-navigation/native';
import { navigate, navigationRef } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { getCurrentUserApi, logoutApi } from '@services/authentication.service';
import { useGetCurrentUser } from '@services/hooks/useGetCurrentUser';
import { setUserInfo } from '@store/slices/authenticationSlice';
import { useQueryClient } from '@tanstack/react-query';
import { showErrorMessage } from '@utils/functions.util';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AccountDetailViewIpad from './components/ipad/account-detail-view';
import AccountDetailViewIphone from './components/iphone/account-detail-view';

const ParentView = isIpad ? AccountDetailViewIpad : AccountDetailViewIphone;


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
    <SafeAreaView className={`bg-neutral15 sm:bg-transparent px-5 sm:px-6`}>
      <ParentView
        name={name}
        control={control}
        checkPermissionAndRedirect={checkPermissionAndRedirect}
        onChangePassword={onChangePassword}
        toggleVisibleLogout={toggleVisibleLogout}
      />
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