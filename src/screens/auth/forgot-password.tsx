import { Button, ScrollView } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordProps, ScreenName } from '@routes/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import BackToLogin from './components/back-to-login';
import Logo from './components/logo';

const formSchema = yup.object().shape({
  accountEmail: yup.string().required('Email address is required!').email('Email address is invalid'),
});

export default function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      accountEmail: '',
    },
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const onNext = (data: any) => {
    navigation.navigate(ScreenName.EnterCode, { email: data.accountEmail });
    // setLoading(true);
    // forgotPasswordApi({ email: data.accountEmail })
    //   .then(() => {
    //     navigation.navigate(ScreenName.EnterCode, { email: data.accountEmail });
    //   })
    //   .catch(() => { })
    //   .finally(() => setLoading(false));
  };


  return (
    <View className='flex-1 bg-white'>
      <ScrollView isContentCenter={isIpad} className='pt-[20%]'>
        <View className='px-5 sm:w-[525] sm:px-0  '>
          <Logo />
          <View className='gap-y-6 mt-8'>
            <TextInput
              errors={errors}
              control={control}
              name='accountEmail'
              label='Email address'
              placeholder='Enter your email address'
              labelOverlap
            />
            <Button
              label='Next'
              disabled={!isValid}
              onPress={handleSubmit(onNext)}
            />
            <BackToLogin className='' />
          </View>
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
}
