import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';
import { Image } from './Image';
import { images } from '@assets/images';

interface Props extends TouchableOpacityProps {
  label?: string;
  classNameLabel?: string;
  iconButton?: ReactNode;
  type?: 'default' | 'outlined' | 'small'

}

const MappingBtn = {
  default: 'bg-primary',
  outlined: 'border border-primary bg-white',
  small: 'h-[37px] bg-teal20 rounded-[8px] self-start',
}
const MappingLabel = {
  default: 'text-black',
  outlined: 'text-black',
  small: 'text-black',
}
export function Button(props: Props) {
  const { label, classNameLabel, disabled, type = 'default', iconButton } = props;

  if (label) {
    return (
      <TouchableOpacity
        {...props}
        className={`flex-row justify-center items-center px-4 h-14 rounded-[14px] ${MappingBtn[type]}
         ${disabled && 'bg-[#F1F1F1]'} ${props.className} 
        `}
      >
        {iconButton && iconButton}
        <Text className={`text-[16px] 
        ${disabled ? 'text-neutral50' : MappingLabel[type]} 
        ${classNameLabel}`
        }>
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
