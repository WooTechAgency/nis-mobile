import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';

interface Props extends TouchableOpacityProps {
  label?: string;
  classNameLabel?: string;
  iconButton?: ReactNode;
}

export function Button(props: Props) {
  const { label, classNameLabel, disabled, iconButton } = props;
  if (label) {
    return (
      <TouchableOpacity
        {...props}
        className={`justify-center items-center bg-primary h-[56] rounded-lg ${props.className} ${disabled && 'bg-disable'}`}
      >
        <Text
          className={`text-[16px] text-white  ${classNameLabel}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity className={` ${props.className}`} {...props}>
      {props.children}
    </TouchableOpacity>
  );
}
