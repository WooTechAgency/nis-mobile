import { images } from '@assets/images'
import Header from '@components/header'
import { Button, Image, SafeAreaView, ScrollView } from '@components/ui'
import Loading from '@components/ui/Loading'
import { TextInput } from '@components/ui/TextInput'
import { ICheckBoxDescription, SortBy, SortDirection } from '@constants/interface'
import { QUERY_KEY } from '@constants/keys.constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppSelector } from '@hooks/common'
import { useDebounce } from '@hooks/useDebounce'
import { navigate } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { getCurrentUserApi } from '@services/authentication.service'
import { useGetIncidentReports } from '@services/hooks/incident/useGetIncidentReports'
import { ISite } from '@services/site.service'
import { showErrorMessage } from '@utils/functions.util'
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
  markedDates: yup.object().notRequired(),
  sort_by: yup.string().notRequired(),
  sort_direction: yup.string().notRequired()
});

export default function Incidents() {
  const { control, setValue, watch } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sort_by: SortBy.ID,
      sort_direction: SortDirection.ASC
    }
  });
  const { userInfo } = useAppSelector((state) => state.authentication)

  const search = watch('search')
  const date = watch('date') as any
  const type = watch('type') as ICheckBoxDescription
  const site = watch('site') as ISite
  const sort_direction = watch('sort_direction') as string
  const sort_by = watch('sort_by') as string
  const debouncedSearch = useDebounce(search, 500)
  const { data: incidents, isLoading, fetchNextPage, hasNextPage, isFetching } = useGetIncidentReports({
    search: debouncedSearch && debouncedSearch.length > 1 ? debouncedSearch : undefined,
    site_id: site?.id,
    incident_type_id: type?.id,
    sort_by: sort_by,
    sort_direction: sort_direction || SortDirection.ASC,
    date_from: date?.startDate,
    date_to: date?.endDate,
    author_id: userInfo?.id
  })

  const checkPermissionAndRedirect = async () => {
    try {
      const user = await getCurrentUserApi()
      const permission = user?.role?.permissions?.incident_reports?.find((permission) => permission.action === 'create')
      if (permission) {
        navigate(RouteName.CreateIncident)
      } else {
        showErrorMessage({ message: 'You do not have permission to perform this action' })
      }
    } catch (error) {
      showErrorMessage({ message: 'You do not have permission to perform this action' })
    }
  }

  return (
    <SafeAreaView>
      <ScrollView
        queryKey={QUERY_KEY.INCIDENT_REPORTS}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      >
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
            placeholder='Search for incident'
            iconRight={<Image source={images.search} className='w-[48px] h-[48px] absolute top-[10%] right-4' />}
          />
          <Button
            label='Report Incident'
            className='flex-row h-[56px] w-[197px] bg-primary rounded-[14px] center'
            onPress={checkPermissionAndRedirect}
          />
        </View>
        <InprogressIncidents />
        <IncidentTable
          incidents={incidents}
          control={control}
          setValue={setValue}
          isFetching={isFetching}
        />
      </ScrollView>
      <Loading loading={isLoading} />
    </SafeAreaView>
  )
}
