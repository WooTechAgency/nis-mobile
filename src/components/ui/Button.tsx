import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';
import { Image } from './Image';
import { images } from '@assets/images';

interface Props extends TouchableOpacityProps {
  label?: string;
  classNameLabel?: string;
  iconButton?: ReactNode;
  type?: 'default' | 'outlined' | 'outlined-small' | 'small' | 'action' | 'delete' | 'outlinedTransparent'

}

const MappingBtn = {
  default: 'h-[56px] bg-primary',
  outlined: 'h-[56px] border border-primary bg-white',
  outlinedTransparent: 'h-[56px] border border-primary bg-transparent',
  'outlined-small': 'h-[36px] border border-primary bg-white',
  small: 'h-[36px] bg-teal20 rounded-[8px] self-start',
  action: 'h-[56px] bg-teal10 border border-primary',
  delete: 'h-[36px] bg-white rounded-[8px] self-start border border-red',
}
const MappingLabel = {
  default: 'text-black',
  outlined: 'text-black',
  'outlined-small': 'text-black',
  small: 'text-black font-medium',
  action: 'text-black',
  delete: 'text-red',
}
export function Button(props: Props) {
  const { label, classNameLabel, disabled, type = 'default', iconButton } = props;

  if (label) {
    return (
      <TouchableOpacity
        {...props}
        className={`flex-row justify-center items-center px-4  rounded-[14px] 
         ${disabled ? 'bg-[#F1F1F1]' : MappingBtn[type]} ${props.className} 
        `}
      >
        {iconButton && iconButton}
        <Text className={`text-[16px] 
          ${disabled ? 'text-neutral50' : MappingLabel[type]} 
          ${classNameLabel}`}
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
