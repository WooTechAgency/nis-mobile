import { images } from '@assets/images';
import SelectedFilter from '@components/common/selected-filter';
import Title from '@components/title';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import CalendarPicker from '@components/ui/CalendarPicker';
import DropdownMenu from '@components/ui/DropdownMenu';
import { isIpad, isIphone } from '@constants/app.constants';
import { SortBy, SortDirection } from '@constants/interface';
import { useToggle } from '@hooks/useToggle';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useGetIncidentsFilterOptions } from '@services/hooks/useGetFilter';
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
const filterBtnCls = 'row-center justify-center sm:w-[135px] px-3 sm:px-0 h-8 border border-primary rounded-lg'

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
  const { data: incidentsFilterOptions } = useGetIncidentsFilterOptions();

  const filters = [
    { icon: images.incidentType, name: 'type', title: 'Incident Type', listValue: incidentsFilterOptions?.incident_types || [], visible: visibleType, toggleVisible: toggleVisibleType },
    { icon: images.location, name: 'site', title: 'Site', listValue: incidentsFilterOptions?.sites || [], visible: visibleSites, toggleVisible: toggleVisibleSites },
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
      {isIphone && <Title label='All' className='mt-6 ' />}
      <View className='bg-white mt-4 sm:mt-6  rounded-[20px] p-4 sm:p-6 '>
        <View className='flex-row items-center sm:justify-between flex-wrap gap-y-4'>
          {(type || site || date) ? (
            <View className='flex-row gap-x-4 flex-wrap gap-4'>
              {type && <SelectedFilter label={type?.label} name='type' setValue={setValue} />}
              {site && <SelectedFilter label={site?.label} name='site' setValue={setValue} />}
              {date && <SelectedFilter label={formatStartDateEndDate(date)} name='date' setValue={setValue} />}
            </View>
          ) : <View className='' />
          }
          <View className='flex-row gap-x-4 '>
            <Button
              className={filterBtnCls}
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
                  className={filterBtnCls}
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
        {/* custom for Iphone and Ipad  */}
        <FlatList
          className={`mt-4 ${isIphone && ' border border-neutral40 rounded-[12px] px-4'}`}
          scrollEnabled={false}
          data={incidents}
          keyExtractor={(item) => item.id}
          isFetching={isFetching}
          ListEmptyComponent={<Text className='text-neutral40'>{'No incidents found'}</Text>}
          ListHeaderComponent={
            isIpad ?
              <View className='flex-row h-10 items-center border-t border-neutral20 gap-x-2'>
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
              : <View className='' />
          }
          renderItem={({ item, index }: { item: IncidentReport, index: number }) => (
            isIpad
              ?
              <Button
                className='flex-row min-h-[56px] items-center border-t border-neutral20 gap-x-2'
                onPress={() => onGoToDetail(item.id)}
              >
                <Text className={`${percent.id} ${rowCls}`}>{item.code}</Text>
                <Text className={`${percent.date} ${rowCls}`}>{convertDDMMYYYY(item.date_time_of_incident)}</Text>
                <Text className={`${percent.type}  ${rowCls} `}>{item.incident_types.map((item => item.name)).join(" / ")}</Text>
                <Text className={`flex-grow ${rowCls} flex-1`} numberOfLines={1}>{item.site.site_name}</Text>
              </Button>
              : <Button
                className={`gap-y-2 py-4 ${index !== (incidents?.length || 0) - 1 && 'border-b border-neutral20'}`}
                onPress={() => onGoToDetail(item.id)}
              >
                <View className='flex-row items-center justify-between'>
                  <Text className={`${rowCls}  font-semibold `}>{item.code}</Text>
                  <Text className={`text-[12px]`}>{convertDDMMYYYY(item.date_time_of_incident)}</Text>
                </View>
                <Text className={`${rowCls} text-[12px]`} numberOfLines={1}>{item.site.site_name}</Text>
                <Text className={`${rowCls} text-[12px]`} numberOfLines={1}>{'Property damage'}</Text>
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