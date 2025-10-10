import { images } from '@assets/images';
import SelectedFilter from '@components/common/selected-filter';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import CalendarPicker from '@components/ui/CalendarPicker';
import DropdownMenu from '@components/ui/DropdownMenu';
import { SortBy, SortDirection } from '@constants/interface';
import { useToggle } from '@hooks/useToggle';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useGetIncidentTypes } from '@services/hooks/incident/useGetIncidentTypes';
import { useGetSites } from '@services/hooks/useGetSites';
import { IncidentReport } from '@services/incident.service';
import { convertDDMMYYYY, formatStartDateEndDate } from '@utils/date.util';
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
  incidents: IncidentReport[] | undefined,
  isFetching?: boolean,
}
export default function IncidentTable({ control, setValue, incidents, isFetching }: Props) {
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
  const sortBy = useWatch({ control, name: 'sort_by' })
  const isASC = sortDirection === SortDirection.ASC

  const onGoToDetail = (id: number) => {
    navigate(RouteName.PreviewIncident, { incidentId: id })
  }

  return (
    <View>
      <View className='bg-white mt-6 rounded-[20px] p-6 '>
        <View className='flex-row items-center justify-between'>
          <View className='row-center gap-x-4'>
            {type && <SelectedFilter label={type?.label} name='type' setValue={setValue} />}
            {site && <SelectedFilter label={site?.label} name='site' setValue={setValue} />}
            {date && <SelectedFilter label={formatStartDateEndDate(date)} name='date' setValue={setValue} />}
            {/* {!type && !site && !date && <View />} */}
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
          isFetching={isFetching}
          ListHeaderComponent={
            <View className='flex-row h-10 items-center border-t border-neutral20'>
              <TouchableOpacity
                className={`flex-row items-center gap-x-2 ${percent.id}`}
                onPress={() => {
                  setValue('sort_direction', isASC ? SortDirection.DESC : SortDirection.ASC)
                  setValue('sort_by', SortBy.ID)
                }}
              >
                <Text className={`${headerCls} ${sortBy === SortBy.ID && 'text-neutral80'}`}>{'Incident ID'}</Text>
                {sortBy === SortBy.ID && <Image source={images.arrowDown} className={`w-4 h-4 ${!isASC && '-rotate-180'}`} />}
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-row items-center gap-x-2 ${percent.date} ${headerCls} ${sortBy === SortBy.DATE_OF_REPORT && 'text-neutral80'}`}
                onPress={() => {
                  setValue('sort_direction', isASC ? SortDirection.DESC : SortDirection.ASC)
                  setValue('sort_by', SortBy.DATE_OF_REPORT)
                }}
              >
                <Text className={`${headerCls} ${sortBy === SortBy.DATE_OF_REPORT && 'text-neutral80'}`}>{"Date of Incident"}</Text>
                {sortBy === SortBy.DATE_OF_REPORT && <Image source={images.arrowDown} className={`w-4 h-4 ${!isASC && '-rotate-180'}`} />}
              </TouchableOpacity>
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