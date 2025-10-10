import { images } from '@assets/images';
import { CommonModal } from '@components/modal';
import { Button, Image, ScrollView, Text } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { colors } from '@constants/colors.constants';
import { PATTERN } from '@constants/pattern.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from '@hooks/useToggle';
import { showSuccess } from '@lib/toast';
import { StackActions } from '@react-navigation/native';
import { EnterNewPasswordProps } from '@routes/types';
import { resetPasswordApi } from '@services/authentication.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import BackToLogin from './components/back-to-login';
import Logo from './components/logo';
import { AuthWrapCls } from './login';

interface Form {
  newPassword: string;
  confirmPassword: string;
}

const formSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .matches(
      PATTERN.PASSWORD,
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    ),
  confirmPassword: yup.string()
    .required('New password is required')
    .oneOf([yup.ref('newPassword'), null], 'Password confirmation does not match the new password.')

});

export default function EnterNewPassword({ navigation, route }: EnterNewPasswordProps) {
  const { code, email } = route.params;
  const [loading, setLoading] = useState(false);
  const [showNewPassword, toggleNewPassword] = useToggle(false);
  const [showConfirmPassword, toggleConfirmPassword] = useToggle(false);
  const [visibleSuccessPopup, setVisibleSuccessPopup] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const toggleSuccessPopup = () => {
    setVisibleSuccessPopup(!visibleSuccessPopup);
    if (visibleSuccessPopup) {
      onBackToLogin();
    }
  };

  const onSavePassword = (data: Form) => {
    Keyboard.dismiss()
    setLoading(true);
    resetPasswordApi({
      token: code,
      email,
      password: data.newPassword,
      password_confirmation: data.newPassword,
    })
      .then(() => {
        showSuccess({ title: 'Your password has been reset' })
        navigation.dispatch(StackActions.popToTop());
      })
      .finally(() => setLoading(false));
  };

  const onBackToLogin = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const isPasswordError = errors.newPassword?.message;

  return (
    <View className='flex-1 bg-white '>
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1 },
          isIpad ? { alignItems: 'center', justifyContent: 'center' } : { marginTop: 182 },
        ]}>
        <View className={AuthWrapCls}>
          <Logo />
          <TextInput
            classNameWrap='mt-12'
            errors={errors}
            control={control}
            isShowError={false}
            name='newPassword'
            label='Password'
            placeholder='Enter your new password'
            secureTextEntry={!showNewPassword}
            labelOverlap
            iconRight={
              <Button className='flex-row items-center absolute right-[9] top-0 bottom-0' onPress={toggleNewPassword}>
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={!!errors.newPassword?.message ? '#E80000' : (showNewPassword ? colors.primary : 'gray')}
                />
              </Button>
            }
          />
          <Text className={`ml-4 text-neutral70 mt-1 ${isPasswordError && 'text-red'}`}>Password must be at least 8 characters and include uppercase, lowercase, number, and special character.</Text>
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
                  tintColor={!!errors.confirmPassword?.message ? '#E80000' : (showNewPassword ? colors.primary : 'gray')}
                />
              </Button>
            }
          />
          <Button label='Reset password' className='mt-6' onPress={handleSubmit(onSavePassword)} />
          <BackToLogin />
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
    </View>
  );
}
