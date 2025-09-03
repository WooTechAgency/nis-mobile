import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger, UseFormWatch, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from './TextInput';

interface Props {
  setValue: UseFormSetValue<any>;
  checkboxName: string;
  control: Control<any, any>;
  label: string;
  trigger: UseFormTrigger<any>
  classNameWrap?: string;
  errors?: FieldErrors;
  descriptionName: string;
  labelDescription?: string;
  placeholderDescription: string;
  watch: UseFormWatch<any>
  selectedName: string
  rootName: string
}

export function CheckboxDescriptionForm(props: Props) {
  const { setValue, checkboxName, selectedName, rootName, descriptionName, control, classNameWrap, watch, errors, label, trigger, labelDescription, placeholderDescription } = props;
  const checked = useWatch({ name: checkboxName, control }) || false

  const onSelect = () => {
    setValue(checkboxName, !checked, { shouldValidate: true });
    const atLeastOne = watch(rootName)?.some((i) => i.selected || !checked);
    setValue(selectedName, atLeastOne, { shouldValidate: true });
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
          errors={errors}
        />
      }
    </View>
  );
}