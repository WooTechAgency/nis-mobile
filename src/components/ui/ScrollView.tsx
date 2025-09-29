import React from 'react';
import { View } from './View';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller';

interface Props extends KeyboardAwareScrollViewProps {
  isContentCenter?: boolean;
  hasRef?: (ref: any) => void;
}
export function ScrollView(props: Props) {

  return (
    <KeyboardAwareScrollView
      ref={props.ref}
      keyboardShouldPersistTaps='handled'
      className={`flex-1 ${props.className}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[props.isContentCenter && { flexGrow: 1, alignItems: 'center' }]}
      {...props}
    >
      {props.children}
    </KeyboardAwareScrollView>
  );
}
