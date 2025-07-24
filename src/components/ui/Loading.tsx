import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  loading?: boolean;
  classNameWrap?: string;
}
export default function Loading({ loading, classNameWrap }: Props) {
  return loading ? (
    <View
      className={`flex-1 absolute left-0 right-0 bottom-0 top-0 justify-center items-center  ${classNameWrap}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
    >
      <ActivityIndicator size={'small'} color={'white'} />
    </View>
  ) : (
    <View />
  );
}
