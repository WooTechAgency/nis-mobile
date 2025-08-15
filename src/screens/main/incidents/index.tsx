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
          title='Incident'
          isBack={false}
        />
        <View className='flex-row center gap-x-6 mt-6  '>
          <TextInput
            classNameWrap='flex-1'
            control={control}
            name='search'
            className='w-full rounded-[100px] h-[42px] text-[14px] pr-[60px] bg-white border-0'
            placeholder='Search for DSRA'
            iconRight={<Image source={images.search} className='w-[48px] h-[48px] absolute top-[10%] right-4' />}
          />
          <Button
            label='Report Incident'
            className='flex-row h-[56px] w-[197px] bg-primary rounded-[14px] center'
            onPress={() => navigate(RouteName.CreateIncident)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}