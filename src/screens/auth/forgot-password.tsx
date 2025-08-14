import { Button, ScrollView } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordProps, RouteName } from '@routes/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import BackToLogin from './components/back-to-login';
import Logo from './components/logo';
import { AuthWrapCls } from './login';
import { forgotPasswordApi } from '@services/authentication.service';

const formSchema = yup.object().shape({
  email: yup.string().required('Email address is required!').email('Invalid email format'),
});

export default function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const onNext = (data: any) => {
    Keyboard.dismiss()
    setLoading(true);
    forgotPasswordApi(data.email)
      .then(() => {
        navigation.navigate(RouteName.EnterCode, { email: data.email });
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  return (
    <View className='flex-1 bg-white'>
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1 },
          isIpad ? { alignItems: 'center', justifyContent: 'center' } : { marginTop: 182 },
        ]}>
        <View className={AuthWrapCls}>
          <Logo />
          <View className='gap-y-6 mt-8'>
            <TextInput
              errors={errors}
              control={control}
              name='email'
              label='Email address'
              placeholder='Enter your email address'
              labelOverlap
              keyboardType='decimal-pad'
            />
            <Button
              label='Send code'
              disabled={!isValid}
              onPress={handleSubmit(onNext)}
            />
          </View>
          <BackToLogin />
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
}
