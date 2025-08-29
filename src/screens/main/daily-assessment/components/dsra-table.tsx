import { images } from '@assets/images';
import SelectedFilter from '@components/common/selected-filter';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import DropdownMenu from '@components/ui/DropdownMenu';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from '@hooks/useToggle';
import { useGetSites } from '@services/hooks/site/useGetSites';
import { convertDDMMYYYY } from '@utils/date.util';
import React from 'react';
import { Control, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

interface DailySiteRiskAssessment {
  id: string;
  date: Date;
  site: string;
  additionalHazards: string;
}
const mockData: DailySiteRiskAssessment[] = [
  {
    id: 'DSRA-1',
    date: new Date(),
    site: 'Ha noi',
    additionalHazards: '3'
  },
  {
    id: 'DSRA-2',
    date: new Date(),
    site: 'Ha noi',
    additionalHazards: '3'
  },
  {
    id: 'DSRA-3',
    date: new Date(),
    site: 'Ha noi',
    additionalHazards: '3'
  },
  {
    id: 'DSRA-4',
    date: new Date(),
    site: 'Ha noi',
    additionalHazards: '3'
  },

]

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
const formSchema = yup.object().shape({
  search: yup.string().notRequired(),
  site: yup.object().notRequired(),
  date: yup.date().notRequired(),
});

export default function DailySiteRickAssessmentTable() {
  const [visibleSites, toggleVisibleSites] = useToggle(false);
  const [visibleDate, toggleVisibleDate] = useToggle(false);

  const {
    control,
    setValue,
  } = useForm({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const { data: sites } = useGetSites();

  const filters = [
    { icon: images.location, name: 'site', title: 'Site', listValue: sites, visible: visibleSites, toggleVisible: toggleVisibleSites },
    { icon: images.date32, name: 'date', title: 'Date', listValue: sites, visible: visibleDate, toggleVisible: toggleVisibleDate },
  ]

  const site = useWatch({ control, name: 'site' })
  const date = useWatch({ control, name: 'date' })

  return (
    <View>
      <View className='mt-8'>
        <Text className='font-semibold text-[20px]'>{'All'}</Text>
        <TextInput
          classNameWrap='flex-1 mt-6'
          control={control}
          name='search'
          className='w-full rounded-[100px] h-[42px] text-[14px] pr-[60px] bg-white'
          placeholder='Search for DSRA'
          iconRight={<Image source={images.search} className='w-[48px] h-[48px] absolute top-[10%] right-4' />}
        />
      </View>

      <View className='bg-white mt-6 rounded-[20px] p-6 '>
        <View className='flex-row items-center justify-between'>
          {site ? <SelectedFilter label={site?.label} name='site' setValue={setValue} /> : <View />}
          <View className='flex-row gap-x-4 self-end'>
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
          data={mockData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className='flex-row h-10 items-center border-t border-neutral20'>
              <View className={`flex-row items-center gap-x-2 ${percent.id}`}>
                <Text className={`${headerCls} text-neutral80`}>{'DSRA ID'}</Text>
                <Button>
                  <Image source={images.arrowDown} className='w-4 h-4' />
                </Button>
              </View>
              <Text className={`${percent.date} ${headerCls}`}>{"Date"}</Text>
              <Text className={`flex-grow ${headerCls}`}>{'Site'}</Text>
              <Text className={`${percent.hazard} ${headerCls}`}>{'Additional Hazards'}</Text>
            </View>
          }
          renderItem={({ item }: { item: DailySiteRiskAssessment }) => (
            <View className='flex-row h-[56px] items-center border-t border-neutral20'>
              <Text className={`${percent.id} ${rowCls}`}>{item.id}</Text>
              <Text className={`${percent.date} ${rowCls}`}>{convertDDMMYYYY(item.date)}</Text>
              <Text className={`flex-grow ${rowCls}`}>{item.site}</Text>
              <Text className={`${percent.hazard} ${rowCls}`}>{item.additionalHazards}</Text>
            </View>
          )
          }
        />
      </View>
    </View>
  )
}