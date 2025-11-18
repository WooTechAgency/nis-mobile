import Header from '@components/header';
import { Button, ScrollView, View, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { goBack } from '@routes/navigationRef';
import { IUser } from '@services/user.service';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import AccountLogo from '../account-logo';

interface UpdateAccountViewIpadProps {
  userInfo?: IUser;
  control: Control<any>;
  errors: FieldErrors<any>;
  handleSubmit: (data: any) => void;
}
export default function UpdateAccountViewIpad({ userInfo, control, errors, handleSubmit }: UpdateAccountViewIpadProps) {
  return (
    <ScrollView>
      <Header title='Account details' />
      <Wrapper className={'flex-row items-start gap-x-12 mt-[0px]'} >
        <AccountLogo name={userInfo?.full_name || ''} />
        <View className='sm:flex-1'>
          <View className='sm:flex-row mt-6 gap-6'>
            <TextInput
              classNameWrap='sm:flex-1'
              control={control}
              name='firstName'
              label='First name'
              errors={errors}
              formatName={true}
              maxLength={50}
            />
            <TextInput
              classNameWrap='flex-1'
              control={control}
              name='lastName'
              label='Last name'
              errors={errors}
              formatName={true}
              maxLength={50}
            />
          </View>
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
          <View className='mt-6 sm:flex-row gap-4'>
            <Button label='Cancel' onPress={goBack} type='outlined' className='flex-1' classNameLabel='' />
            <Button
              label='Save'
              onPress={handleSubmit}
              className='flex-1'
            />
          </View>
        </View>
      </Wrapper>
    </ScrollView>
  )
}