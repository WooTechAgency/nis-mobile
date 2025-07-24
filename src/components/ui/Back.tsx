import { View, ViewProps } from 'react-native';
import React from 'react';
import { Image } from './Image';
import { Text } from './Text';
import { Button } from './Button';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIpad } from '@constants/app.constants';
import { images } from '@assets/images';

interface Props {
  classNameWrap?: string;
}

export function Back(props: Props) {
  const { classNameWrap } = props;

  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Button
      style={{ top: isIpad ? 69 : top + 33 }}
      className={`flex-row items-center absolute z-10 right-[20] sm:right-[61] ${classNameWrap}`}
      onPress={onBack}
    >
      <Image source={images.arrowLeft} className='w-[32] h-[32]' />
      <Text className='text-[12px] text-black font-medium'>Back</Text>
    </Button>
  );
}
