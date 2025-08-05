import Header from '@components/header';
import { CommonModal } from '@components/modal';
import { Button, SafeAreaView, Text, View } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { useToggle } from '@hooks/useToggle';
import { StackActions } from '@react-navigation/native';
import { navigate, navigationRef } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { setUserInfo } from '@store/slices/authenticationSlice';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function UpdateAccount() {
  const dispatch = useDispatch()
  const query = useQueryClient()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      name: 'John',
      company: 'NIS'
    },
    mode: 'onChange',
    // resolver: yupResolverr(formSchema),
  });
  const [visibleLogout, toggleVisibleLogout] = useToggle()
  const [isEditing, toggleEditing] = useToggle(false);

  const onUpdateProfile = (data: any) => {

  }

  return (
    <SafeAreaView className='bg-neutral-100'>
      <Header title='Account details' />
      <View className='flex-row items-start gap-x-8 mt-6 bg-white p-6 rounded-[8px]'>
        <View className='w-[108px] h-[108px] rounded-full bg-green-300 justify-center items-center'>
          <Text className='text-[28px] font-semibold text-white'>JW</Text>
        </View>
        <View className='flex-1'>
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='name'
            label='Name'
            labelOverlap
            disabled
            className='text-[#000000]'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='company'
            label='Company'
            labelOverlap
            disabled
            className='text-[#000000]'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='role'
            label='Role'
            labelOverlap
            disabled
            className='text-[#000000]'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='email'
            label='Email Address'
            labelOverlap
            disabled
            className='text-[#000000]'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='phone'
            label='Phone Number'
            labelOverlap
            disabled
            className='text-[#000000]'
          />
          <View className='mt-6 flex-row gap-x-6'>
            <Button label='Cancel' onPress={toggleEditing} type='outlined' className='flex-1' classNameLabel='' />
            <Button
              label='Save'
              onPress={handleSubmit(onUpdateProfile)}
              className='flex-1'
            />
          </View>
        </View>

      </View>

    </SafeAreaView>
  )
}