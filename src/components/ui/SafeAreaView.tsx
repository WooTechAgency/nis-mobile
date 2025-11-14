import React from 'react';
import { SafeAreaView as SafeAreaViewComponent, SafeAreaViewProps } from 'react-native-safe-area-context';
import { View } from './View';

interface Props extends SafeAreaViewProps {
  isNotSaveBottom?: boolean;
  isSaveBottom?: boolean;
}
export function SafeAreaView(props: Props) {
  const { isSaveBottom } = props;

  return (
    <SafeAreaViewComponent
      {...props}
      className={`bg-white sm:bg-neutral15 flex-1  `}
      edges={isSaveBottom ? ['left', 'right', 'top', 'bottom'] : ['left', 'right', 'top']}
    >
      <View className={`flex-1 bg-neutral15 px-5 sm:px-6 ${props.className}`}>
        {props.children}
      </View>
    </SafeAreaViewComponent>
  );
}
