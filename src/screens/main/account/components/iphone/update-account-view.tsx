import Header from '@components/header';
import { Button, Image, ScrollView, Text, View, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { goBack } from '@routes/navigationRef';
import { IUser } from '@services/user.service';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import AccountLogo from '../account-logo';
import { images } from '@assets/images';

interface UpdateAccountViewIpadProps {
  userInfo?: IUser;
  control: Control<any>;
  errors: FieldErrors<any>;
  handleSubmit: (data: any) => void;
}
export default function UpdateAccountViewIphone({ userInfo, control, errors, handleSubmit }: UpdateAccountViewIpadProps) {
  return (
    <ScrollView>
      <Header
        title='Account details'
        rightComponent={<AccountLogo name={userInfo?.full_name || ''} />}
      />
      <View className='w-full bg-neutral40 h-[1px] -mt-3' />
      <View >
        <Wrapper >
          <Text className='font-semibold text-[16px]'>Profile</Text>
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='firstName'
            label='First name'
            errors={errors}
            formatName={true}
            maxLength={50}
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='lastName'
            label='Last name'
            errors={errors}
            formatName={true}
            maxLength={50}
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='company'
            label='Company'
            labelOverlap
            disabled
          />
          <TextInput
            classNameWrap='mt-6'
            control={control}
            name='role'
            label='Role'
            labelOverlap
            disabled
          />
        </Wrapper>
      </View>
      <Wrapper>
        <Text className='font-semibold text-[16px]'>Account Details</Text>
        <TextInput
          classNameWrap='mt-6'
          control={control}
          name='email'
          label='Email Address'
          labelOverlap
          disabled
        />
        <TextInput
          classNameWrap='mt-6'
          control={control}
          name='phone'
          label='Phone Number'
          labelOverlap
          keyboardType='phone-pad'
          formatPhone={true}
          errors={errors}
        />
      </Wrapper>
      <View className='mt-6 sm:flex-row gap-4'>
        <Button label='Cancel' onPress={goBack} type='outlined' className='flex-1' classNameLabel='' />
        <Button
          label='Save'
          onPress={handleSubmit}
          className='flex-1'
        />
      </View>
    </ScrollView >
  )
}