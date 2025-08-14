import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from './Button';
import { Text } from './Text';
import { Image } from './Image';
import { images } from '@assets/images';

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  errors?: FieldErrors;
  isRadio?: boolean;

}
const commonWrapCls = 'w-[100px] h-[60px] rounded-[10px] justify-center items-center border'
const commonLabelCls = 'font-bold text-[20px]'
export function YesNoForm(props: Props) {
  const { setValue, name, control, label, classNameWrap, isRadio, labelCls } = props;
  const value = useWatch({ name, control, });
  console.log('value ', value)

  const onYes = () => {
    setValue(name, true, { shouldDirty: true });
  };

  const onNo = () => {
    setValue(name, false, { shouldDirty: true });
  };
  if (isRadio) {
    return (
      <View className={`flex-row items-center border border-neutral40 px-4 rounded-[14px] gap-x-11 h-[56px] ${classNameWrap}`}>
        {label &&
          <Text className={`text-[12px] text-neutral70 px-1 mb-1 absolute left-4 -top-2 bg-white z-10 ${labelCls}`} >
            {label}
          </Text>
        }
        {/* Yes */}
        <Button
          className='flex-row items-center gap-x-2'
          onPress={onYes}
        >
          <Image source={value ? images.radioChecked : images.radio} className='w-6 h-6' />
          <Text className='text-base text-neutral70'>{'Yes'}</Text>
        </Button>
        <Button
          className='flex-row items-center gap-x-2'
          onPress={onNo}
        >
          <Image source={!value ? images.radioChecked : images.radio} className='w-6 h-6' />
          <Text className='text-base text-neutral70'>{'No'}</Text>
        </Button>
      </View>
    )
  }

  return (
    <View className={`self-center ${classNameWrap}`}>
      <View className='mt-3 flex-row items-center gap-x-2'>
        <Button className={`${commonWrapCls}  ${value && 'bg-primary border-0'}`} onPress={onYes}>
          <Text className={`${commonLabelCls}  ${value && 'text-white'}`}>Yes</Text>
        </Button>
        <Button className={`${commonWrapCls} ${!value && 'bg-primary'}`} onPress={onNo}>
          <Text className={`${commonLabelCls} ${!value && 'text-white'}`}>No</Text>
        </Button>
      </View>
    </View>
  );
}
