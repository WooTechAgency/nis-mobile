import { Back, Button, ScrollView } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { EnterCodeProps, RouteName } from '@routes/types';
import { enterCodedApi, forgotPasswordApi } from '@services/authentication.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import BackToLogin from './components/back-to-login';
import Logo from './components/logo';
import { AuthWrapCls } from './login';

const formSchema = yup.object().shape({
  code: yup.string().required('Code is required!').length(6, 'Invalid code'),
});

interface Form {
  code: string;
}

export default function EnterCode({ navigation, route }: EnterCodeProps) {
  const [loading, setLoading] = useState(false);
  const { email } = route.params
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      code: '',
    },
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const onResetPassword = ({ code }: Form) => {
    Keyboard.dismiss()
    setLoading(true);
    enterCodedApi({ token: code, email })
      .then(() => {
        navigation.navigate(RouteName.EnterNewPassword, { code, email });
      })
      .finally(() => setLoading(false));
  };

  const onResendCode = () => {
    setLoading(true);
    forgotPasswordApi(email).finally(() => setLoading(false));
  };

  return (
    <View className='flex-1 bg-white '>
      <ScrollView contentContainerStyle={[
        { flexGrow: 1 },
        isIpad ? { alignItems: 'center', justifyContent: 'center' } : { marginTop: 182 },
      ]}>
        <View className={AuthWrapCls}>
          <Logo />
          <TextInput
            classNameWrap='mt-12'
            errors={errors}
            control={control}
            name='code'
            label='Code sent to your email'
            placeholder='Enter the code'
            labelOverlap
          />
          <Button label='Verify' className='mt-6' disabled={!isValid} onPress={handleSubmit(onResetPassword)} />
          <Button
            label='Resend code'
            className='mt-3'
            onPress={onResendCode}
            type='outlined'
          />
          <BackToLogin />
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
}
