import { images } from '@assets/images';
import { Button, Image, SafeAreaView, ScrollView, Text, Wrapper } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { PATTERN } from '@constants/pattern.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import Header from '@components/header';
import { colors } from '@constants/colors.constants';
import { useAppDispatch, useAppSelector } from '@hooks/common';
import { useToggle } from '@hooks/useToggle';
import { showSuccess } from '@lib/toast';
import { goBack } from '@routes/navigationRef';
import { changePasswordApi } from '@services/user.service';
import { setUserInfo } from '@store/slices/authenticationSlice';

interface Form {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const formSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required!'),
  newPassword: yup
    .string()
    .required('New password is required!')
    .matches(
      PATTERN.PASSWORD,
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    ),
  confirmPassword: yup.string()
    .required('Confirm password is required!')
    .oneOf([yup.ref('newPassword'), null], 'Password confirmation does not match the new password.')

});

export default function ChangePassword() {
  const dispatch = useAppDispatch();
  const { userInfo: cachedUser } = useAppSelector((state) => state.authentication)
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, toggleCurrentPassword] = useToggle(false);
  const [showNewPassword, toggleNewPassword] = useToggle(false);
  const [showConfirmPassword, toggleConfirmPassword] = useToggle(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onSavePassword = (data: Form) => {
    setLoading(true);
    changePasswordApi({
      current_password: data.currentPassword.trim(),
      new_password: data.newPassword.trim(),
      new_password_confirmation: data.confirmPassword.trim(),
    })
      .then((res) => {
        showSuccess({ title: 'Password updated successfully!' })
        dispatch(setUserInfo({ ...cachedUser, token: res.token }))
        goBack()
      })
      .finally(() => setLoading(false));
  };
  console.log(errors);

  const isPasswordError = errors.newPassword?.message;

  return (
    <SafeAreaView className=''>
      <ScrollView>
        <Header
          isBack
          title='Change password'
        />
        <Wrapper className='mt-[0px] pt-[24px]'>
          <TextInput
            errors={errors}
            control={control}
            name='currentPassword'
            label='Current Password'
            placeholder='Enter your current password'
            secureTextEntry={!showCurrentPassword}
            labelOverlap
            iconRight={
              <Button className='flex-row items-center absolute right-[9] top-0 bottom-0' onPress={toggleCurrentPassword}>
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={showCurrentPassword ? colors.primary : 'gray'}
                />
              </Button>
            }
          />
          <TextInput
            classNameWrap='mt-8'
            errors={errors}
            control={control}
            name='newPassword'
            label='New password'
            placeholder='Enter your new password'
            secureTextEntry={!showNewPassword}
            labelOverlap
            iconRight={
              <Button className='flex-row items-center absolute right-[9] top-0 bottom-0' onPress={toggleNewPassword}>
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={(showNewPassword ? colors.primary : 'gray')}
                />
              </Button>
            }
          />
          {!errors.newPassword && <Text className={`ml-4 text-[12px] mt-1 `}>Password must be at least 8 characters and include uppercase, lowercase, number, and special character.</Text>}
          <TextInput
            classNameWrap='mt-8'
            errors={errors}
            control={control}
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Re-enter your new password'
            secureTextEntry={!showConfirmPassword}
            labelOverlap
            iconRight={
              <Button className='flex-row items-center absolute right-[9] top-0 bottom-0' onPress={toggleConfirmPassword}>
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={showConfirmPassword ? colors.primary : 'gray'}
                />
              </Button>
            }
          />
          <View className='flex-row gap-x-4 mt-6'>
            <Button label='Cancel' type='outlined' onPress={goBack} className='flex-1' />
            <Button label='Save' onPress={handleSubmit(onSavePassword)} className='flex-1' />
          </View>
        </Wrapper>
      </ScrollView>
      <Loading loading={loading} />
    </SafeAreaView>
  );
}
