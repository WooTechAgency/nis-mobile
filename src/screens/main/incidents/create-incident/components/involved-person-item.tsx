import Title from '@components/title';
import { Button, Wrapper, YesNoForm } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { useToggle } from '@hooks/useToggle';
import React from 'react';
import { Control, FieldErrors, UseFieldArrayRemove, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { useIncidentContext } from '../../context';
import { CommonModal } from '@components/modal';

interface Props {
  index: number
  classNameWrap?: string;
  setValue: UseFormSetValue<any>;
  name: string;
  errors?: FieldErrors;
  control: Control<any, any>;
  remove: UseFieldArrayRemove
}

export function InvolvedPersonItem({ control, errors, setValue, index, name, remove }: Props) {
  const [visibleConfirmRemove, toggleConfirmRemove] = useToggle()
  const thirdParty = useWatch({ control, name: `${name}.thirdParty` });
  const injured = useWatch({ control, name: `${name}.injured` });

  const onRemove = () => {
    remove(index)
  }

  return (
    <Wrapper className='gap-y-6 mt-[0px]'>
      {/* Hazard */}
      <View className='row-center justify-between'>
        <Title label={`Person ${index + 1}`} className='text-base' />
        <Button
          label='Delete Signee'
          type='outlined-small'
          classNameLabel='text-xs font-medium'
          className='w-[135px]'
          onPress={toggleConfirmRemove}
        />
      </View>

      <View className='flex-row items-start gap-x-4  '>
        <TextInput
          control={control}
          setValue={setValue}
          classNameWrap='flex-1'
          name={`${name}.name`}
          label='Name*'
          placeholder='Enter name'
          errors={errors}
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name={`${name}.role`}
          label='Role*'
          placeholder='Enter role'
        />
      </View>
      <YesNoForm
        isRadio
        control={control}
        setValue={setValue}
        name={`${name}.thirdParty`}
        label='Third-party?*'
      />
      {thirdParty &&
        <View className='flex-row items-start gap-x-4  '>
          <TextInput
            control={control}
            setValue={setValue}
            classNameWrap='flex-1'
            errors={errors}
            name={`${name}.email`}
            label='Email*'
            placeholder='Enter email'
          />
          <TextInput
            classNameWrap='flex-1'
            errors={errors}
            control={control}
            name={`${name}.phoneNumber`}
            label='Phone number*'
            keyboardType='phone-pad'
            placeholder='Enter phone number'
          />
        </View>
      }
      <YesNoForm
        isRadio
        control={control}
        setValue={setValue}
        name={`${name}.injured`}
        label='Injured?'
      />
      {injured &&
        <TextInput
          control={control}
          errors={errors}
          setValue={setValue}
          name={`${name}.treatment`}
          label='Treatment required'
          placeholder='Enter treatment'
        />
      }
      <CommonModal
        visible={visibleConfirmRemove}
        toggleModal={toggleConfirmRemove}
        title='Delete Person'
        des='Are you sure you want to delete this person'
        btnPositiveText='Delete'
        btnNegativeText='Cancel'
        onPositive={onRemove}
      />
    </Wrapper>
  );
}
