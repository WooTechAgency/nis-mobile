import { images } from '@assets/images';
import Header from '@components/header';
import { Button, Image, ScrollView, Text, View, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import React from 'react';
import { Control } from 'react-hook-form';
import AccountLogo from '../account-logo';

interface AccountDetailProps {
  name: string;
  control: Control<any>;
  checkPermissionAndRedirect: () => void;
  onChangePassword: () => void;
  toggleVisibleLogout: () => void;
}
export default function AccountDetailViewIphone({ name, control, checkPermissionAndRedirect, onChangePassword, toggleVisibleLogout }: AccountDetailProps) {
  return (
    <ScrollView>
      <Header
        title='Account details'
        rightComponent={<AccountLogo name={name} />}
      />
      <View className=''>
        <Wrapper className='mt-[0px] sm:mt-8' >
          <View className='flex-row items-center justify-between'>
            <Text className='font-semibold text-[16px]'>Profile</Text>
            <Button
              onPress={checkPermissionAndRedirect}
              iconButton={<Image source={images.edit} />}
              label='Edit'
              type='outlined-small'
              className='sm:w-[135px]'
            />
          </View>
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='name'
            label='Name'
            labelOverlap
            disabled
            labelCls='text-neutral70'
            className='text-neutral80'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='company'
            label='Company'
            labelOverlap
            disabled
            labelCls='text-neutral70'
            className='text-neutral80'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='role'
            label='Role'
            labelOverlap
            disabled
            labelCls='text-neutral70'
            className='text-neutral80'
          />
        </Wrapper>
        <Wrapper>
          <Text className='font-semibold text-[16px]'>Account Details</Text>
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='email'
            label='Email Address'
            labelOverlap
            disabled
            labelCls='text-neutral70'
            className='text-neutral80'
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='phone'
            label='Phone Number'
            labelOverlap
            disabled
            labelCls='text-neutral70'
            className='text-neutral80'
            formatPhone={true}
            keyboardType='phone-pad'
          />
        </Wrapper>
        <View className='mt-6 sm:flex-row gap-4 sm:gap-6'>
          <Button label='Change Password' onPress={onChangePassword} type='outlinedTransparent' className='sm:flex-1' classNameLabel='' />
          <Button
            label='Logout'
            onPress={toggleVisibleLogout}
            type='outlinedTransparent'
            className='sm:flex-1 border-red '
            classNameLabel='text-red '
          />
        </View>
      </View>
    </ScrollView>
  )
}