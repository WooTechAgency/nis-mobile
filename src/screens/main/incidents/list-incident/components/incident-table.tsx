import { images } from '@assets/images';
import SelectedFilter from '@components/common/selected-filter';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import CalendarPicker from '@components/ui/CalendarPicker';
import DropdownMenu from '@components/ui/DropdownMenu';
import { SortDirection } from '@constants/interface';
import { useToggle } from '@hooks/useToggle';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useGetIncidentTypes } from '@services/hooks/incident/useGetIncidentTypes';
import { useGetSites } from '@services/hooks/useGetSites';
import { IncidentReport } from '@services/incident.service';
import { convertDDMMYYYY } from '@utils/date.util';
import dayjs from 'dayjs';
import React from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';


const percent = {
  id: 'w-[15%]',
  date: 'w-[18%]',
  type: 'w-[33%]'
}
const headerCls = 'text-[12px] font-medium text-neutral50'
const rowCls = 'text-[16px] text-neutral70'

interface Props {
  control: Control<any, any>,
  setValue: UseFormSetValue<any>,
  incidents: IncidentReport[] | undefined
}
export default function IncidentTable({ control, setValue, incidents }: Props) {
  const [visibleSites, toggleVisibleSites] = useToggle(false);
  const [visibleType, toggleVisibleType] = useToggle(false);
  const [visibleCalendar, toggleVisibleCalendar] = useToggle(false)
  const { data: sites } = useGetSites();
  const { data: incidentTypes } = useGetIncidentTypes();

  const filters = [
    { icon: images.incidentType, name: 'type', title: 'Incident Type', listValue: incidentTypes, visible: visibleType, toggleVisible: toggleVisibleType },
    { icon: images.location, name: 'site', title: 'Site', listValue: sites, visible: visibleSites, toggleVisible: toggleVisibleSites },
  ]

  const site = useWatch({ control, name: 'site' })
  const type = useWatch({ control, name: 'type' })
  const date = useWatch({ control, name: 'date' })
  const sortDirection = useWatch({ control, name: 'sort_direction' })
  const isASC = sortDirection === SortDirection.ASC

  const onGoToDetail = (id: number) => {
    navigate(RouteName.PreviewIncident, { incidentId: id })
  }

  const formatStartDateEndDate = (date) => {
    const { startDate, endDate } = date;
    if (startDate && endDate) {
      const monthStartDate = startDate.split('-')[1]
      const monthEndDate = endDate.split('-')[1]
      return monthStartDate === monthEndDate
        ? `${dayjs(startDate).format('D')} - ${dayjs(endDate).format('D MMM')}`
        : `${dayjs(startDate).format('D MMM')} - ${dayjs(endDate).format('D MMM')}`
    } else if (startDate) {
      return `${dayjs(startDate).format('D MMM')}`
    }
    return ''
  }


  return (
    <View>
      <View className='bg-white mt-6 rounded-[20px] p-6 '>
        <View className='flex-row items-center justify-between'>
          <View className='row-center gap-x-4'>
            {type && <SelectedFilter label={type?.label} name='type' setValue={setValue} />}
            {site && <SelectedFilter label={site?.label} name='site' setValue={setValue} />}
            {date && <SelectedFilter label={formatStartDateEndDate(date)} name='site' setValue={setValue} />}
            {!type && !site && !date && <View />}
          </View>
          <View className='flex-row gap-x-4 self-end'>
            <Button
              className='row-center justify-center w-[135px] h-8 border border-primary rounded-lg '
              onPress={toggleVisibleCalendar}
            >
              <Image source={images.date32} className='w-8 h-8' />
              <Text className='text-[12px] font-medium'>{'Date'}</Text>
            </Button>
            {filters.map((filter, index) => (
              <DropdownMenu
                key={index}
                visible={filter.visible}
                toggleVisible={filter.toggleVisible}
                listValue={filter?.listValue || []}
                setValue={setValue}
                control={control}
                name={filter.name}
              >
                <Button
                  className='row-center justify-center w-[135px] h-8 border border-primary rounded-lg '
                  key={filter.title}
                  onPress={filter.toggleVisible}
                >
                  <Image source={filter.icon} className='w-8 h-8' />
                  <Text className='text-[12px] font-medium'>{filter.title}</Text>
                </Button>
              </DropdownMenu>
            ))}
          </View>
        </View>
        <FlatList
          className='mt-4'
          scrollEnabled={false}
          data={incidents}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className='flex-row h-10 items-center border-t border-neutral20'>
              <TouchableOpacity
                className={`flex-row items-center gap-x-2 ${percent.id}`}
                onPress={() => setValue('sort_direction', isASC ? SortDirection.DESC : SortDirection.ASC)}
              >
                <Text className={`${headerCls} text-neutral80`}>{'Incident ID'}</Text>
                <Image source={images.arrowDown} className={`w-4 h-4 ${!isASC && '-rotate-180'}`} />
              </TouchableOpacity>
              <Text className={`${percent.date} ${headerCls}`}>{"Date of Incident"}</Text>
              <Text className={`${percent.type}  ${headerCls}`}>{'Incident Type'}</Text>
              <Text className={`flex-grow ${headerCls}`}>{'Site'}</Text>
            </View>
          }
          renderItem={({ item }: { item: IncidentReport }) => (
            <Button
              className='flex-row h-[56px] items-center border-t border-neutral20'
              onPress={() => onGoToDetail(item.id)}
            >
              <Text className={`${percent.id} ${rowCls}`}>{item.code}</Text>
              <Text className={`${percent.date} ${rowCls}`}>{convertDDMMYYYY(item.date_of_report)}</Text>
              <Text className={`${percent.type}  ${rowCls}`}>{item.incident_types.map((item => item.name)).join(" / ")}</Text>
              <Text className={`flex-grow ${rowCls}`}>{item.site.site_name}</Text>
            </Button>
          )}
        />
      </View>
      <CalendarPicker
        name='date'
        visible={visibleCalendar}
        toggleModal={toggleVisibleCalendar}
        setValue={setValue}
        control={control}
      />
    </View>
  )
}