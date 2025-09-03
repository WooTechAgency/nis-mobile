import { CommonModal } from '@components/modal';
import Title from '@components/title';
import { Button, Wrapper } from '@components/ui';
import { DocumentForm } from '@components/ui/DocumentForm';
import { TextInput } from '@components/ui/TextInput';
import { useToggle } from '@hooks/useToggle';
import React from 'react';
import { Control, FieldErrors, UseFieldArrayRemove, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { View } from 'react-native';
import { useIncidentContext } from '../../context';

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
  const { setIncident } = useIncidentContext()


  const onRemove = () => {
    remove(index)
  }

  return (
    <Wrapper className='mt-8'>
      <View className='row-center justify-between'>
        <Title label={`Signee ${index + 1}`} />
        <Button
          label='Delete Signee'
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
      <View className='flex-row items-start gap-x-4 mt-6'>
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
      <Title label='Statement' className='text-base mt-4 mb-2' />
      <DocumentForm
        name={`${name}.document`}
        setValue={setValue}
        control={control}
      />
      <CommonModal
        visible={visibleConfirmRemove}
        toggleModal={toggleConfirmRemove}
        title='Delete Signee'
        des='Are you sure you want to delete this signee'
        btnPositiveText='Delete'
        btnNegativeText='Cancel'
        onPositive={onRemove}
      />
    </Wrapper>
  );
}
