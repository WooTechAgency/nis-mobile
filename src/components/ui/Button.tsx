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
  default: 'text-black',
  outlined: 'text-black',
}
export function Button(props: Props) {
  const { label, classNameLabel, disabled, type = 'default' } = props;

  if (label) {
    return (
      <TouchableOpacity
        {...props}
        className={`justify-center items-center px-4 h-[56] rounded-[14px]  ${disabled ? 'bg-neutral5' : MappingBtn[type]} ${props.className} `}
      >
        <Text className={`text-[16px] ${disabled ? 'text-neutral50' : MappingLabel[type]} ${classNameLabel}`} >
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
