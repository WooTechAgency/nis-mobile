import { images } from '@assets/images';
import { CommonModal } from '@components/modal';
import { Back, Button, Image, SafeAreaView, ScrollView, Text } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { PATTERN } from '@constants/pattern.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions } from '@react-navigation/native';
import { EnterNewPasswordProps } from '@routes/types';
import { resetPasswordApi } from '@services/authentication.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';

import { showSuccess } from '@lib/toast';
import Header from '@components/header';
import { useToggle } from '@hooks/useToggle';
import { goBack } from '@routes/navigationRef';


interface Form {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const formSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required!'),
  newPassword: yup
    .string()
    .matches(
      PATTERN.PASSWORD,
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Password confirmation does not match the new password.')

});

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, toggleCurrentPassword] = useToggle(false);
  const [showNewPassword, toggleNewPassword] = useToggle(false);
  const [showConfirmPassword, toggleConfirmPassword] = useToggle(false);
  const [visibleSuccessPopup, setVisibleSuccessPopup] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });


  const toggleSuccessPopup = () => {
    setVisibleSuccessPopup(!visibleSuccessPopup);
    if (visibleSuccessPopup) {
      onBackToLogin();
    }
  };

  const onSavePassword = (data: Form) => {
    // setLoading(true);
    // resetPasswordApi({
    //   token: code,
    //   new_password: data.newPassword,
    //   new_password_confirmation: data.newPassword,
    // })
    //   .then(() => {
    //     showSuccess({ title: 'Your password has been reset', message: 'You can now use your new password to log in' })
    //   })
    //   .finally(() => setLoading(false));
  };


  const onBackToLogin = () => {
  };

  const isPasswordError = errors.newPassword?.message;

  return (
    <SafeAreaView className='flex-1 bg-white '>
      <ScrollView>
        <Header
          isBack
          title='Change password'
          rightComponent={
            <View className='flex-row gap-x-4'>
              <Button label='Cancel' type='outlined' onPress={goBack} />
              <Button label='Save' onPress={handleSubmit(onSavePassword)} />
            </View>
          }
        />
        <View className='px-5'>
          <TextInput
            classNameWrap='mt-8'
            errors={errors}
            control={control}
            isShowError={false}
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
                  tintColor={!!errors.newPassword?.message ? '#E80000' : (showNewPassword ? '#6F63FF' : 'gray')}
                />
              </Button>
            }
          />
          <TextInput
            classNameWrap='mt-8'
            errors={errors}
            control={control}
            isShowError={false}
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
                  tintColor={!!errors.newPassword?.message ? '#E80000' : (showNewPassword ? '#6F63FF' : 'gray')}
                />
              </Button>
            }
          />
          <Text className={`ml-4 mt-1 ${isPasswordError && 'text-red'}`}>Password must be at least 8 characters and include uppercase, lowercase, number, and special character.</Text>
          <TextInput
            classNameWrap='mt-8'
            errors={errors}
            control={control}
            isShowError={true}
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Enter your new password'
            secureTextEntry={!showConfirmPassword}
            labelOverlap
            iconRight={
              <Button className='flex-row items-center absolute right-[9] top-0 bottom-0' onPress={toggleConfirmPassword}>
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={!!errors.confirmPassword?.message ? '#E80000' : (showNewPassword ? '#6F63FF' : 'gray')}
                />
              </Button>
            }
          />
        </View>
      </ScrollView>
      <Loading loading={loading} />
      <CommonModal
        visible={visibleSuccessPopup}
        toggleModal={toggleSuccessPopup}
        title='Your password has been reset'
        des='You can now use your new password to log in'
        wrapperClassName='py-[40] px-[32] sm:py-[32] sm:px-[28] '
      />
    </SafeAreaView>
  );
}
