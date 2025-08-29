import { images } from '@assets/images';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { convertDDMMYYYY } from '@utils/date.util';
import React from 'react';
import { Control } from 'react-hook-form';

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

export default function DailySiteRickAssessmentTable({ control }: Props) {

  const filters = [
    { icon: images.date32, title: 'Date' },
    { icon: images.location, title: 'Site' }
  ]

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
          <View className='row-center pl-3 rounded-lg bg-teal20'>
            <Text className='text-xs font-medium'>Darling Harbour</Text>
            <Image source={images.close32} className='w-8 h-8' />
          </View>
          <View className='flex-row gap-x-4 self-end'>
            {filters.map((filter) => (
              <Button className='row-center justify-center w-[135px] h-8 border border-primary rounded-lg ' key={filter.title}>
                <Image source={filter.icon} className='w-8 h-8' />
                <Text className='text-[12px] font-medium'>{filter.title}</Text>
              </Button>
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
        <View className='flex-row items-center self-end gap-x-3 ' >
          <Text className='w-[64px] text-center text-neutral70 text-[12px]'>Previous</Text>
          <Button
            label='1'
            classNameLabel='text-[10px]'
            className=' px-8 h-9'
          />
          <Text className='w-[64px] text-center text-neutral70 text-[12px]'>Next</Text>
        </View>
      </View>
    </View>
  )
}