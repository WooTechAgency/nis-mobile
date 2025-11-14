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
export default function AccountDetailViewIpad({ name, control, checkPermissionAndRedirect, onChangePassword, toggleVisibleLogout }: AccountDetailProps) {
  return (
    <ScrollView>
      <Header title='Account details' />
      <Wrapper className={'flex-row items-start gap-x-12 mt-[0px]'} >
        <AccountLogo name={name} />
        <View className='sm:flex-1'>
          <View className='flex-row items-center justify-between'>
            <Text className='font-semibold text-[16px]'>Profile</Text>
            <Button
              className='w-[135px] h-[36px] flex-row center border border-primary rounded-[8px]'
              onPress={checkPermissionAndRedirect}
            >
              <Image source={images.edit} className='w-8 h-8' />
              <Text className='text-[12px] font-medium'>Edit</Text>
            </Button>
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
          />
          <View className='mt-6 sm:flex-row gap-4 sm:gap-6'>
            <Button label='Change Password' onPress={onChangePassword} type='outlined' className='sm:flex-1' classNameLabel='' />
            <Button
              label='Logout'
              onPress={toggleVisibleLogout}
              type='outlined'
              className='sm:flex-1 border-red '
              classNameLabel='text-red '
            />
          </View>
        </View>
      </Wrapper>
    </ScrollView>
  )
}