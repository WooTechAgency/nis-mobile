import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import { getMessageError } from '@utils/common.util';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from './TextInput';


interface Props {
  setValue: UseFormSetValue<any>;
  checkboxName: string;
  control: Control<any, any>;
  label: string;

  classNameWrap?: string;
  errors?: FieldErrors;
  descriptionName: string;
  labelDescription: string;
  placeholderDescription: string;
}


export function CheckboxDescriptionForm(props: Props) {
  const { setValue, checkboxName, descriptionName, control, classNameWrap, errors, label, labelDescription, placeholderDescription } = props;
  const checked = useWatch({ name: checkboxName, control }) || false

  const messageError = getMessageError(errors, checkboxName);

  const onSelect = () => {
    setValue(checkboxName, !checked);
  };

  return (
    <View className={`${classNameWrap}`}>
      <Button
        onPress={onSelect}
        className='row-center border border-border rounded-[14px] h-[56px] px-1'
      >
        <Image source={checked ? images.checked : images.checkbox} className='w-10 h-10' />
        <Text className=''>{label}</Text>
      </Button>
      {checked &&
        <TextInput
          classNameWrap='mt-4'
          control={control}
          multiline
          setValue={setValue}
          name={descriptionName}
          label={labelDescription}
          placeholder={placeholderDescription}
          hasVoice
        />
      }
    </View>
  );
}