import { View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { forgotPasswordApi } from '@services/authentication.service';
import { Back, Button, Image, ScrollView } from '@components/ui';
import { isIpad } from '@constants/app.constants';
import { images } from '@assets/images';
import { TextInput } from '@components/ui/TextInput';
import Loading from '@components/ui/Loading';
import { ForgotPasswordProps, ScreenName } from '@routes/types';

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
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const onNext = (data: any) => {
    setLoading(true);
    forgotPasswordApi({ email: data.accountEmail })
      .then(() => {
        navigation.navigate(ScreenName.EnterCode, { email: data.accountEmail });
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  return (
    <View className='flex-1 bg-white'>
      <Back />
      <ScrollView isContentCenter={isIpad} className='pt-[182] sm:pt-[216]'>
        <View className='px-5 sm:w-[416] sm:px-0 '>
          <Image source={images.logo} className='sm:h-[62] sm:w-[268] h-[49] w-[186] self-center' />
          <View className='mt-[94] '>
            <TextInput
              errors={errors}
              control={control}
              name='accountEmail'
              label='Email address'
              placeholder='Enter your email address'
            />
            <Button
              label='Get password reset code'
              className='mt-6'
              disabled={!isValid}
              onPress={handleSubmit(onNext)}
            />
          </View>
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
}
