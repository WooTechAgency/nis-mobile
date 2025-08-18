import { images } from '@assets/images';
import { Button, Image, ScrollView, Text } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { colors } from '@constants/colors.constants';
import { MMKV_KEY } from '@constants/keys.constants';
import { PATTERN } from '@constants/pattern.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@hooks/common';
import { StackActions } from '@react-navigation/native';
import { navigate, navigationRef } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { loginApi } from '@services/authentication.service';
import { mmkv } from '@store/mkkv';
import { setUserInfo } from '@store/slices/authenticationSlice';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import Logo from './components/logo';

const formSchema = yup.object().shape({
  email: yup.string().required('Email address is required').email('Invalid email format'),
  password: yup.string().required('The password you entered is incorrect').matches(
    PATTERN.PASSWORD,
    'Password must have at least 8 characters and contain numbers, lowercase and uppercase letters and special characters..'
  ),
});
export const AuthWrapCls = `px-5 sm:w-[416px] sm:px-0`
export default function Login() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      // email: mmkv.getString(MMKV_KEY.EMAIL),
    },
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });


  const toggleShowVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const onLogin = async (data: { email: string; password: string }) => {
    Keyboard.dismiss()
    try {
      setLoading(true);
      const response = await loginApi({ email: data.email, password: data.password });
      // mmkv.set(MMKV_KEY.EMAIL, data.email)
      dispatch(setUserInfo({ ...response.user, token: response.token, }));
      navigationRef.dispatch(StackActions.replace(RouteName.MainNavigator));
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = () => {
    navigate(RouteName.ForgotPassword);
  };

  return (
    <View className='flex-1 bg-white'>
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1 },
          isIpad ? { alignItems: 'center', justifyContent: 'center' } : { marginTop: 182 },
        ]}
      >
        <View className={AuthWrapCls}>
          <Logo />
          <TextInput
            classNameWrap='mt-12'
            errors={errors}
            control={control}
            name='email'
            keyboardType='email-address'
            label='Account email'
            placeholder='Enter your account email'
            labelOverlap
          />
          <TextInput
            name='password'
            errors={errors}
            control={control}
            label='Password'
            placeholder='Enter your password'
            classNameWrap='mt-6'
            secureTextEntry={!visiblePassword}
            labelOverlap
            iconRight={
              <Button
                className='flex-row items-center absolute right-[9] top-0 bottom-0'
                onPress={toggleShowVisiblePassword}
              >
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={(visiblePassword ? colors.primary : 'gray')}
                />
              </Button>
            }
          />
          <Button label='Log in' className='mt-6' disabled={!isValid} onPress={handleSubmit(onLogin)} />
          <Button onPress={onForgotPassword} className='self-center'>
            <Text className='mt-3 text-[12px] text-neutral70'>Forgot password?</Text>
          </Button>
        </View>
      </ScrollView>
      <Loading loading={loading} />
      {/* <CommonModal
        visible={visibleLoginError}
        toggleModal={toggleLoginError}
        btnPositiveText='Try again'
        btnNegativeText='Forgot password?'
        onNegative={onForgotPassword}
        title='Login failed'
        des='The email address or password you entered is incorrect.'
      /> */}
    </View>
  );
}

