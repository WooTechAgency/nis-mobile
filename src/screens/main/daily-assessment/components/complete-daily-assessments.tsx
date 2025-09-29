import { images } from '@assets/images';
import SelectedFilter from '@components/common/selected-filter';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import CalendarPicker from '@components/ui/CalendarPicker';
import DropdownMenu from '@components/ui/DropdownMenu';
import { TextInput } from '@components/ui/TextInput';
import { SortDirection } from '@constants/interface';
import { useToggle } from '@hooks/useToggle';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { DSRA } from '@services/dsra.service';
import { useGetSites } from '@services/hooks/useGetSites';
import { convertDDMMYYYY, formatStartDateEndDate } from '@utils/date.util';
import React from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

interface Props {
  control: Control<any, any>
}
const percent = {
  id: 'w-[13%]',
  date: 'w-[15%]',
  hazard: 'w-[15%]'
}
const headerCls = 'text-[12px] font-medium text-neutral50'
const rowCls = 'text-[16px] text-neutral70'
interface Props {
  dsra?: DSRA[]
  control: Control<any, any>,
  setValue: UseFormSetValue<any>,
  isFetching?: boolean;
}
export default function CompleteDailyAssessments({ dsra, control, setValue, isFetching, }: Props) {
  const [visibleSites, toggleVisibleSites] = useToggle(false);
  const [visibleCalendar, toggleVisibleCalendar] = useToggle(false);

  const { data: sites } = useGetSites();

  const filters = [
    { icon: images.location, name: 'site', title: 'Site', listValue: sites, visible: visibleSites, toggleVisible: toggleVisibleSites },
  ]

  const site = useWatch({ control, name: 'site' })
  const date = useWatch({ control, name: 'date' })
  const sort_direction = useWatch({ control, name: 'sort_direction' })
  const isASC = sort_direction === SortDirection.ASC

  return (
    <View className='mt-8 gap-y-6'>
      <>
        <Text className='font-semibold text-[20px]'>{'All'}</Text>
        <TextInput
          classNameWrap='flex-1'
          control={control}
          name='search'
          className='w-full rounded-[100px] h-[42px] text-[14px] pr-[60px] bg-white'
          placeholder='Search for DSRA'
          iconRight={<Image source={images.search} className='w-[48px] h-[48px] absolute top-[10%] right-4' />}
        />
      </>
      <View className='bg-white rounded-[20px] p-6 '>
        <View className='flex-row items-center justify-between'>
          {site && <SelectedFilter label={site?.label} name='site' setValue={setValue} />}
          {date && <SelectedFilter label={formatStartDateEndDate(date)} name='date' setValue={setValue} />}
          {!site && !date && <View />}
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
          className='mt-4 '
          scrollEnabled={false}
          data={dsra}
          keyExtractor={(item) => item.id}
          isFetching={isFetching}
          ListHeaderComponent={
            <View className='flex-row h-10 items-center border-t border-neutral20'>
              <Button
                className={`flex-row items-center gap-x-2 ${percent.id}`}
                onPress={() => setValue('sort_direction', isASC ? SortDirection.DESC : SortDirection.ASC)}
              >
                <Text className={`${headerCls} text-neutral80`}>{'DSRA ID'}</Text>
                <Image source={images.arrowDown} className='w-4 h-4' />
              </Button>
              <Text className={`${percent.date} ${headerCls}`}>{"Date"}</Text>
              <Text className={`flex-grow ${headerCls}`}>{'Site'}</Text>
              <Text className={`${percent.hazard} ${headerCls}`}>{'Additional Hazards'}</Text>
            </View>
          }
          renderItem={({ item }: { item: DSRA }) => (
            <Button
              className='flex-row h-[56px] items-center border-t border-neutral20'
              onPress={() => navigate(RouteName.DailyAssessmentPreview, { dsraId: item.id })}
            >
              <Text className={`${percent.id} ${rowCls}`}>{item.dsra_code}</Text>
              <Text className={`${percent.date} ${rowCls}`}>{convertDDMMYYYY(item.created_at)}</Text>
              <Text className={`flex-grow ${rowCls}`}>{item.site.site_name}</Text>
              <Text className={`${percent.hazard} ${rowCls}`}>{item?.hazards?.length || 0}</Text>
            </Button>
          )
          }
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