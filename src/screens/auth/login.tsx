import { images } from '@assets/images';
import { Button, Image, ScrollView, Text } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@hooks/common';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '@routes/navigationRef';
import { ScreenName } from '@routes/types';
import { loginApi } from '@services/authentication.service';
import { storage } from '@store/mkkv';
import { setUserInfo } from '@store/slices/authenticationSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  accountEmail: yup.string().required('Email address is required').email('Email address is invalid'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);
  const [visibleLoginError, setVisibleLoginError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      accountEmail: '',
      password: 'Password123*',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });


  const toggleShowVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const toggleLoginError = () => {
    setVisibleLoginError(!visibleLoginError);
  };

  // useEffect(() => {
  //   const getCacheEmail = async () => {
  //     const cachedEmail = storage.getString('email')
  //     if (cachedEmail) {
  //       setValue('accountEmail', cachedEmail)
  //     }
  //   }
  //   getCacheEmail()
  // }, [])

  const onLogin = async (data: { accountEmail: string; password: string }) => {
    Keyboard.dismiss()
    try {
      setLoading(true);
      const response = await loginApi({ email: data.accountEmail, password: data.password });
      console.log('response ', response)
      // storage.set('email', data.accountEmail)

      dispatch(setUserInfo({ access_token: response.data.access_token, ...response.data.user_information }));
      // navigation.navigate('MainStack');
    } catch (error) {
      // if (error?.data?.isWrongInfo) {
      //   toggleLoginError();
      // } else if (error?.data?.isAccountPaused) {
      //   showPopupError('Contact support for assistance', 'Account paused');
      // } else {
      //   showPopupError(error?.message, 'Login failed');
      // }
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = () => {
    navigate(ScreenName.ForgotPassword);
  };

  return (
    <View className='flex-1 bg-white'>
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1 },
          isIpad ? { alignItems: 'center', justifyContent: 'center' } : { marginTop: 182 },
        ]}
        className='pt-[5] '
      >
        <View className='px-5 sm:w-[416] sm:px-0 '>
          <Image source={images.logo} className='sm:h-[62] sm:w-[268] h-[49] w-[186] self-center' />
          <TextInput
            classNameWrap='mt-[116] sm:mt-[73]'
            errors={errors}
            control={control}
            name='accountEmail'
            keyboardType='email-address'
            label='Email address'
            placeholder='Enter your email address'
          />
          <TextInput
            name='password'
            errors={errors}
            control={control}
            label='Password'
            placeholder='Enter your password'
            classNameWrap='mt-6'
            secureTextEntry={!visiblePassword}
            iconRight={
              <Button
                className='flex-row items-center absolute right-[9] top-0 bottom-0'
                onPress={toggleShowVisiblePassword}
              >
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={errors.password?.message ? '#E80000' : visiblePassword ? '#6F63FF' : undefined}
                />
              </Button>
            }
          />
          <Button label='Log in' className='mt-6' onPress={handleSubmit(onLogin)} />
          <Button onPress={onForgotPassword}>
            <Text className='mt-[8] text-[12px]'>Forgot password?</Text>
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
