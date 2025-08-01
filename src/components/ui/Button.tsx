import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';

interface Props extends TouchableOpacityProps {
  label?: string;
  classNameLabel?: string;
  iconButton?: ReactNode;
  type?: 'default' | 'outlined'
}

const MappingBtn = {
  default: 'bg-primary',
  outlined: 'border border-primary bg-white',
}
const MappingLabel = {
  default: 'text-white',
  outlined: 'text-primary',
}
export function Button(props: Props) {
  const { label, classNameLabel, disabled, type = 'default' } = props;

  if (label) {
    return (
      <TouchableOpacity
        {...props}
        className={`justify-center items-center  h-[56] rounded-lg  ${disabled ? 'bg-btnDisable' : MappingBtn[type]} ${props.className} `}
      >
        <Text className={`font-semibold text-[16px] ${MappingLabel[type]} ${classNameLabel}`} >
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
