import { View, ViewProps } from 'react-native';
import React from 'react';

export function Container(props: ViewProps) {
  return <View className={`flex-1 bg-primary ${props.className}`}>{props.children}</View>;
}
