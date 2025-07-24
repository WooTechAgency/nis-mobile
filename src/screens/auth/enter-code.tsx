import { images } from '@assets/images';
import { Back, Button, Image, ScrollView } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { isIpad } from '@constants/app.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { EnterCodeProps, ScreenName } from '@routes/types';
import { enterCodedApi, forgotPasswordApi } from '@services/authentication.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  code: yup.string().required('Code is required!'),
});

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
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const onResetPassword = (data: any) => {
    setLoading(true);
    enterCodedApi({ token: data.code })
      .then(() => {
        navigation.navigate(ScreenName.EnterNewPassword, { code: data.code });
      })
      .finally(() => setLoading(false));
  };

  const onResendCode = () => {
    setLoading(true);
    forgotPasswordApi({ email }).finally(() => setLoading(false));
  };

  return (
    <View className='flex-1 bg-white '>
      <Back />
      <ScrollView isContentCenter={isIpad} className='pt-[182] sm:pt-[216]'>
        <View className='px-5 sm:w-[416] sm:px-0 '>
          <Image source={images.logo} className='sm:h-[62] sm:w-[268] h-[49] w-[186] self-center' />
          <TextInput
            classNameWrap='mt-[73]'
            errors={errors}
            control={control}
            name='code'
            label='Code sent to your email'
            placeholder='Enter the code'
          />
          <Button label='Reset password' className='mt-6' disabled={!isValid} onPress={handleSubmit(onResetPassword)} />
          <Button
            label='Resend code'
            className='mt-3 sm:mt-6'
            classNameLabel='text-violet'
            onPress={onResendCode}
          />
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
}
