import { View, Text } from 'react-native';
import React from 'react';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

export default function Indicator(props: ViewProps) {
  return <View className={`w-full h-[1] bg-grey200 my-5 `} {...props} />;
}
