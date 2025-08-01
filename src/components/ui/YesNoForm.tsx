import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from './Button';
import { Text } from './Text';

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  errors?: FieldErrors;

}
const commonWrapCls = 'w-[100px] h-[60px] rounded-[10px] justify-center items-center border'
const commonLabelCls = 'font-bold text-[20px]'
export function YesNoForm(props: Props) {
  const { setValue, name, control, label, classNameWrap } = props;
  const value = useWatch({ name, control, });
  console.log('value ', value)

  const onYes = () => {
    setValue(name, true, { shouldDirty: true });
  };

  const onNo = () => {
    setValue(name, false, { shouldDirty: true });
  };

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
