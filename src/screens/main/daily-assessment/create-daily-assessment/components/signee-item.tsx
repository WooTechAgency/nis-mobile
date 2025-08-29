import { Signature } from '@components/signature';
import Title from '@components/title';
import { DropdownPicker } from '@components/ui/DropdownPicker';
import { TextInput } from '@components/ui/TextInput';
import { useGetRoles } from '@services/hooks/role/useGetRoles';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { View } from 'react-native';
import { useAssessmentContext } from '../../context';

interface Props {
  index: number
  classNameWrap?: string;
  setValue: UseFormSetValue<any>;
  name?: string;
  errors?: FieldErrors;
  control: Control<any, any>;
  trigger: UseFormTrigger<any>;
}

export function SigneeItem({ control, trigger, errors, setValue, index, name }: Props) {
  const { setAssessment } = useAssessmentContext()
  const { data: roles } = useGetRoles()

  const onStartSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: false }))
  }

  const onEndSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: true }))
  }

  return (
    <View className='mt-8'>
      <Title label={`Signee ${index + 1}`} />
      <View className='flex-row items-start gap-x-4 mt-6'>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name={`${name}.name`}
          label='Name'
          placeholder='Enter name'
        />
        <DropdownPicker
          classNameWrap='flex-1'
          setValue={setValue}
          control={control}
          name={`${name}.role`}
          label='Role'
          placeholder="Select role"
          listValue={roles}
          errors={errors}
        />
      </View>
      <Signature
        name={`${name}`}
        classNameWrap='mt-6'
        onBegin={onStartSign}
        onEnd={onEndSign}
        control={control}
        setValue={setValue}
        trigger={trigger}
        errors={errors}
      />
    </View>
  );
}
