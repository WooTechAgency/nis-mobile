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
  return (
    <View>
      <View className='mt-8'>
        <Text className='font-semibold text-[20px]'>{'All'}</Text>
        <View className='flex-row center gap-x-6 mt-6  '>
          <TextInput
            classNameWrap='flex-1'
            control={control}
            name='search'
            className='w-full rounded-[100px] h-[42px] text-[14px] pr-[60px] '
            placeholder='Search for DSRA'
            iconRight={<Image source={images.search} className='w-[48px] h-[48px] absolute top-[10%] right-4' />}
          />
          <Button className='flex-row h-[56px] w-[333px] bg-primary rounded-[14px] center'>
            <Image source={images.filter} className='w-8 h-8' />
            <Text className='text-[12px] ml-2'>Filter</Text>
          </Button>
          {/* <View className='flex-row gap-x-4'>
            <Button className='border rounded-full px-2 py-1 flex-row items-center gap-x-3'>
              <Text className='text-[10px]'>Status</Text>
              <Image source={images.arrowLeft} className='w-5 h-5' />
            </Button>
            <Button className='border rounded-full px-2 py-1 flex-row items-center gap-x-3'>
              <Text className='text-[10px]'>Date</Text>
              <Image source={images.arrowLeft} className='w-5 h-5' />
            </Button>
          </View> */}

        </View>
      </View>
      <View className='bg-white mt-6 rounded-[20px] p-6'>
        <FlatList
          scrollEnabled={false}
          data={mockData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className='flex-row h-8 items-center '>
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