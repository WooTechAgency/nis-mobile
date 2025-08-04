import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image, SafeAreaView, ScrollView } from '@components/ui'
import Header from '@components/header'
import { TextInput } from '@components/ui/TextInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { images } from '@assets/images'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
});

export default function Incidents() {
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
        <Header
          title='Incidents'
          isBack={false}
          rightComponent={<Button label='Report Incident' className='px-4' onPress={() => navigate(RouteName.CreateIncident)} />}
        />
        {/* table */}
        <View className='mt-8'>
          <Text className='font-semibold text-[20px]'>{'All'}</Text>
          <View className='flex-row items-center justify-between mt-6  '>
            <TextInput
              classNameWrap='w-[50%]'
              control={control}
              name='search'
              className='w-full rounded-full h-[36px] text-[14px] pl-12 '
              placeholder='Search...'
              iconLeft={<Image source={images.logo} className='w-[18px] h-[18px] absolute top-[25%] left-4' />}
            />
            <View className='flex-row gap-x-4'>
              <Button className='border rounded-full px-2 py-1 flex-row items-center gap-x-3'>
                <Text className='text-[10px]'>Incident Type</Text>
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
    </SafeAreaView>
  )
}