import { CommonModal } from '@components/modal';
import { Signature } from '@components/signature';
import Title from '@components/title';
import { Button, Wrapper } from '@components/ui';
import { DropdownPicker } from '@components/ui/DropdownPicker';
import { TextInput } from '@components/ui/TextInput';
import { useToggle } from '@hooks/useToggle';
import { useGetRoles } from '@services/hooks/useGetRoles';
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
  trigger: UseFormTrigger<any>;
  remove: UseFieldArrayRemove
}

export function SigneeItem({ control, trigger, errors, setValue, index, name, remove }: Props) {
  const [visibleConfirmRemove, toggleConfirmRemove] = useToggle()
  const { setIncident } = useIncidentContext()
  const { data: roles } = useGetRoles()

  const onStartSign = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: false }))
  }

  const onEndSign = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: true }))
  }

  const onRemove = () => {
    remove(index)
  }

  // const isOwnerSubmitted = (signee.name === userInfo?.full_name) && (signee.role.id === userInfo?.role.id) && !!signee.signature

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
