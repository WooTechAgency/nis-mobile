import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { View } from './View';

interface Props extends KeyboardAwareScrollViewProps {
  isContentCenter?: boolean;
  hasRef?: (ref: any) => void;
}
export function ScrollView(props: Props) {

  return (
    <KeyboardAwareScrollView
      innerRef={(ref) => {
        props.hasRef && props.hasRef(ref);
      }}
      keyboardShouldPersistTaps='handled'
      className={`flex-1 ${props.className}`}
      enableOnAndroid
      // extraHeight={1}
      enableAutomaticScroll
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[props.isContentCenter && { flexGrow: 1, alignItems: 'center' }]}
      {...props}
    >
      {props.children}
      <View className='h-[128]' />
    </KeyboardAwareScrollView>
  );
}
