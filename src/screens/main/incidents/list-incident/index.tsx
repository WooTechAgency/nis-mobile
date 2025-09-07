import { images } from '@assets/images'
import Header from '@components/header'
import { Button, Image, SafeAreaView, ScrollView } from '@components/ui'
import Loading from '@components/ui/Loading'
import { TextInput } from '@components/ui/TextInput'
import { ICheckBoxDescription, SortDirection } from '@constants/interface'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDebounce } from '@hooks/useDebounce'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { useGetIncidentReports } from '@services/hooks/incident/useGetIncidentReports'
import { ISite } from '@services/site.service'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import * as yup from 'yup'
import IncidentTable from './components/incident-table'
import InprogressIncidents from './components/inprogress-incidents'

const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
  site: yup.object().notRequired(),
  type: yup.object().notRequired(),
  date: yup.object().notRequired(),
  sort_direction: yup.string().notRequired()
});

export default function Incidents() {
  const { control, setValue, watch } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sort_direction: SortDirection.ASC
    }
  });

  const search = watch('search')
  const date = watch('date') as any
  const type = watch('type') as ICheckBoxDescription
  const site = watch('site') as ISite
  const sort_direction = watch('sort_direction') as string


  const debouncedSearch = useDebounce(search, 500)
  const { data: incidents, isLoading } = useGetIncidentReports({
    search: debouncedSearch && debouncedSearch.length > 1 ? debouncedSearch : undefined,
    site_id: site?.id,
    incident_type_id: type?.id,
    sort_by: 'id',
    sort_direction: sort_direction || SortDirection.ASC,
  })

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
        <InprogressIncidents />
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