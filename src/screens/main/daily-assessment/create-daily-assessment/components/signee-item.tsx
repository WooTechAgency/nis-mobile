import { Signature } from '@components/signature';
import Title from '@components/title';
import { Wrapper } from '@components/ui';
import { DropdownPicker } from '@components/ui/DropdownPicker';
import { TextInput } from '@components/ui/TextInput';
import { currentEmploymentStatus } from '@screens/main/daily-assessment/create-daily-assessment/steps/step-general-info';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { View } from 'react-native';
import { useAssessmentContext } from '../../context';

interface Props {
  index: number
  classNameWrap?: string;
  setValue: UseFormSetValue<any>;
  name?: string;
  errors?: FieldErrors;
  control: Control<any, any>;
}

export function SigneeItem({ control, classNameWrap, errors, setValue, index, name }: Props) {
  const { setAssessment } = useAssessmentContext()

  const onStartSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: false }))
  }

  const onEndSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: true }))
  }

  return (
    <View className='mt-8'>
      <Title label={`Signee ${index + 1}`} />
      <View className='flex-row items-center gap-x-4 mt-6'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name={`${name}.${index}.name`}
          label='Name'
          placeholder='Enter name'
        />
        <DropdownPicker
          classNameWrap='flex-1'
          setValue={setValue}
          control={control}
          name={`${name}.${index}.role`}
          label='Role'
          placeholder="Select role"
          listValue={currentEmploymentStatus}
        />
      </View>
      <Signature
        name={`${name}.${index}`}
        classNameWrap='mt-6'
        onBegin={onStartSign}
        onEnd={onEndSign}
        control={control}
        setValue={setValue}
      />
    </View>
  );
}
