import React from 'react';
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
      className={`bg-white flex-1 px-4 ${props.className}`}
      edges={isSaveBottom ? ['left', 'right', 'top', 'bottom'] : ['left', 'right', 'top']}
    >
      {props.children}
    </SafeAreaViewComponent>
  );
}
