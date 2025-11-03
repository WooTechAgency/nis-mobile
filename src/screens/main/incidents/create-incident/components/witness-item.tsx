import { CommonModal } from '@components/modal';
import Title from '@components/title';
import { Button, Wrapper } from '@components/ui';
import { DocumentForm } from '@components/ui/DocumentForm';
import { TextInput } from '@components/ui/TextInput';
import { useToggle } from '@hooks/useToggle';
import React from 'react';
import { Control, FieldErrors, UseFieldArrayRemove, UseFormSetValue } from 'react-hook-form';
import { View } from 'react-native';
import { rowClsIncident } from '../../config.incident';

interface Props {
  index: number
  classNameWrap?: string;
  setValue: UseFormSetValue<any>;
  name: string;
  errors?: FieldErrors;
  control: Control<any, any>;
  remove: UseFieldArrayRemove
}

export function WitnessItem({ control, errors, setValue, index, name, remove }: Props) {
  const [visibleConfirmRemove, toggleConfirmRemove] = useToggle()

  const onRemove = () => {
    remove(index)
  }

  return (
    <Wrapper className='mt-6 sm:mt-8'>
      <View className='row-center justify-between'>
        <Title label={`Witness ${index + 1}`} />
        <Button
          label='Delete witness'
          type='outlined-small'
          classNameLabel='text-xs font-medium'
          className='w-[135px]'
          onPress={toggleConfirmRemove}
        />
      </View>
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name={`${name}.name`}
        label='Name'
        placeholder='Enter name'
      />
      <View className={rowClsIncident}>
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name={`${name}.phone`}
          label='Phone'
          placeholder='Enter phone'
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name={`${name}.email`}
          label='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='Enter email'
        />
      </View>
      <Title label='Statement' className='text-base mt-6 sm:mt-4 mb-2' />
      <DocumentForm
        name={`${name}.documents`}
        setValue={setValue}
        control={control}
      />
      <CommonModal
        visible={visibleConfirmRemove}
        toggleModal={toggleConfirmRemove}
        title='Delete Witness'
        des='Are you sure you want to delete this witness'
        btnPositiveText='Delete'
        btnNegativeText='Cancel'
        onPositive={onRemove}
      />
    </Wrapper>
  );
}
