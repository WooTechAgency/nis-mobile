import { images } from '@assets/images';
import { CommonModal } from '@components/modal';
import { Back, Button, Image, ScrollView, Text } from '@components/ui';
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


const formSchema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(
      PATTERN.PASSWORD,
      'Password must have at least 1 upper case letter, 1 lower case letter, 1 numeric character and 1 special character'
    ),
});

export default function EnterNewPassword({ navigation, route }: EnterNewPasswordProps) {
  const { code } = route.params;
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [visibleSuccessPopup, setVisibleSuccessPopup] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      newPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleSuccessPopup = () => {
    setVisibleSuccessPopup(!visibleSuccessPopup);
    if (visibleSuccessPopup) {
      onBackToLogin();
    }
  };

  const onSavePassword = (data: any) => {
    setLoading(true);
    resetPasswordApi({
      token: code,
      new_password: data.newPassword,
      new_password_confirmation: data.newPassword,
    })
      .then(() => {
        toggleSuccessPopup();
      })
      .finally(() => setLoading(false));
  };

  const onBackToLogin = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const isPasswordError = errors.newPassword?.message;

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
            isShowError={false}
            name='newPassword'
            label='New password'
            placeholder='Choose a new password'
            secureTextEntry={!showNewPassword}
            iconRight={
              <Button className='flex-row items-center absolute right-[9] top-0 bottom-0' onPress={toggleNewPassword}>
                <Image
                  source={images.eye}
                  className='w-[32] h-[32]'
                  tintColor={errors.newPassword?.message ? '#E80000' : showNewPassword ? '#6F63FF' : undefined}
                />
              </Button>
            }
          />
          {isPasswordError && (
            <>
              <Text className={`text-[12px] text-neutral70 mt-1 ml-4 ${isPasswordError && 'text-red'}`}>
                Must contain a combination of a lowercase letter, uppercase letter, numeral, and a special character.
              </Text>
            </>
          )}

          <Button label='Reset password' className='mt-6' onPress={handleSubmit(onSavePassword)} disabled={!isValid} />
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
