import React from 'react';
// import {SafeAreaViewComponent} from 'react-native'
import { SafeAreaView as SafeAreaViewComponent, SafeAreaViewProps } from 'react-native-safe-area-context';

interface Props extends SafeAreaViewProps {
  isNotSaveBottom?: boolean;
  isSaveBottom?: boolean;
}
export function SafeAreaView(props: Props) {
  const { isSaveBottom } = props;

  return (
    <SafeAreaViewComponent
      {...props}
      className={`bg-neutral15  flex-1 px-6 ${props.className}`}
      edges={isSaveBottom ? ['left', 'right', 'top', 'bottom'] : ['left', 'right', 'top']}
    >
      {props.children}
    </SafeAreaViewComponent>
  );
}
