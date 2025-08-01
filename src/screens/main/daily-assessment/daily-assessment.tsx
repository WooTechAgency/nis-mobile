import { Button, Image, SafeAreaView, ScrollView, Text, View } from '@components/ui'
import { navigate } from '@routes/navigationRef'
import * as yup from 'yup';
import React from 'react'
import DailySite from './components/daily-site'
import Header from '@components/header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '@components/ui/TextInput';
import { images } from '@assets/images';

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
});

export default function DailyAssessment() {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Header title='Daily Site Risk Assessment' isBack={false} />
        <DailySite />
        {/* table */}
        <View className='mt-8'>
          <Text className='font-semibold text-[20px]'>{'All'}</Text>
          <View className='flex-row items-center justify-between mt-6  '>
            <TextInput
              classNameWrap='w-[50%]'
              control={control}
              name='search'
              className='w-full rounded-[100px] h-[42px] text-[14px] pl-12 '
              placeholder='Search...'
              iconLeft={<Image source={images.logo} className='w-[18px] h-[18px] absolute top-[25%] left-4' />}
            />
            <View className='flex-row gap-x-4'>
              <Button className='border rounded-full px-2 py-1 flex-row items-center gap-x-3'>
                <Text className='text-[10px]'>Status</Text>
                <Image source={images.arrowLeft} className='w-5 h-5' />
              </Button>
              <Button className='border rounded-full px-2 py-1 flex-row items-center gap-x-3'>
                <Text className='text-[10px]'>Date</Text>
                <Image source={images.arrowLeft} className='w-5 h-5' />
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <Button
        className='mt-4'
        label='Create Daily Assessment'
        onPress={() => navigate(RouteName.CreateDailyAssessment)}
      /> */}
    </SafeAreaView>
  )
}