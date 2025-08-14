import { Text as ReactText, TextProps } from 'react-native';
import React from 'react';

export function Text(props: TextProps) {
  return (
    <ReactText
      className={`font-regular text-[14px] sm:text-base text-neutral80 ${props.className}`}
      allowFontScaling={false}
      {...props}
    >
      {props.children}
    </ReactText>
  );
}
