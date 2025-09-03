import { images } from '@assets/images'
import Header from '@components/header'
import { Button, Image, SafeAreaView, ScrollView } from '@components/ui'
import { TextInput } from '@components/ui/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Text, View } from 'react-native'
import * as yup from 'yup'
import IncidentTable from './components/incident-table'
import { useGetIncidentReports } from '@services/hooks/incident/useGetIncidentReports'
import Loading from '@components/ui/Loading'
import { useDebounce } from '@hooks/useDebounce'
import { ISite } from '@services/site.service'
import { ICheckBoxDescription } from '@constants/interface'

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
  site: yup.object().notRequired(),
  type: yup.object().notRequired(),
  date: yup.object().notRequired(),
});

export default function Incidents() {
  const { control, setValue, watch } = useForm({
    resolver: yupResolver(formSchema),
  });

  const search = watch('search')
  const date = watch('date') as any
  const type = watch('type') as ICheckBoxDescription
  const site = watch('site') as ISite

  console.log('sitesite ', site)

  const debouncedSearch = useDebounce(search, 500)

  const { data: incidents, isLoading } = useGetIncidentReports()

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

        <IncidentTable
          incidents={incidents}
          control={control}
          setValue={setValue}
        />
      </ScrollView>
      <Loading loading={isLoading} />
    </SafeAreaView>
  )
}
{/* {
          incidents?.map((item) => (
            <View
              className='flex-row items-end  bg-white justify-between rounded-[20px] p-6 mt-6 '
              key={item.id}
            >
              <View>
                <View className='flex-row  items-center gap-x-3 mb-4'>
                  <Text className='text-base font-semibold'>{item.id}</Text>
                  <View className={`px-[10px] h-[24px] center rounded-full bg-orange10 `}>
                    <Text className='text-xs font-medium'>{'IN PROGRESS'}</Text>
                  </View>
                </View>
                <View className='flex-row  items-center gap-x-1'>
                  <Image source={images.location} className='w-8 h-8' />
                  <Text className='text-base'>{item.location}</Text>
                </View>
              </View>
              <Button
                label='Continue'
                onPress={() => { }}
                className='w-[204px]'
              />
            </View>
          ))
        } */}