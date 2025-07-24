import { View } from 'react-native';
import React, { ReactNode } from 'react';
import { Button, Text } from '../UI';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function GlobalModal() {
  const navigation = useNavigation();
  const params = useRoute().params;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className='flex-1 px-5 sm:items-center justify-center bg-dropBack'>
      <View className={`bg-white  py-6 px-4 sm:w-[488] sm:py-[32px] sm:px-[28px] rounded-lg `}>
        <Text className={`text-[21px] font-semibold text-center leading-6`}>{params?.title || 'Notification'}</Text>
        <Text className={` text-center mt-2 leading-6 mb-[24]`}>{params?.message}</Text>
        <Button label={params?.btnText || 'Close'} onPress={goBack} />
      </View>
    </View>
  );
}
