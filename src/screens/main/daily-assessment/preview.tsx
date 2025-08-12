import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image, SafeAreaView, ScrollView, checkListTemp } from '@components/ui'
import Header from '@components/header'
import { useAssessmentContext } from './context'
import { convertUTCDate } from '@utils/date.util'
import { images } from '@assets/images'

function Item({ label, value, classNameWrap }: { label: string, value?: string, classNameWrap?: string }) {
  return (
    <View className={`gap-y-1 mt-4 ${classNameWrap}`}>
      <Text className='text-[13px] font-semibold'>{label}</Text>
      {value && <Text className='text-[12px]'>{value}</Text>}
    </View>
  )
}
const commonTitleCls = 'font-semibold text-[20px]'
const commonWrapCls = 'border border-gray rounded-[5px] p-4'
export default function Preview() {
  const { assessment: { generalInfo, firstAid, checkList, singing } } = useAssessmentContext()
  console.log('singing ', singing)

  console.log('generalInfo', generalInfo)
  const onEdit = () => { }

  const onSaveDraft = () => { }

  const onSubmit = () => { }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={'DSRA-001'}
          isBack
          rightComponent={
            <View className='flex-row gap-x-2 '>
              <Button label='Edit' className='px-3' type='outlined' onPress={onEdit} />
              <Button label='Save draft' className='px-3' type='outlined' onPress={onSaveDraft} />
              <Button label='Submit' className='px-3' onPress={onSubmit} />
            </View>
          }
        />
        {/* general information */}
        <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>General Information</Text>
          <View className='flex-row'>
            <Item label='Site location' value={generalInfo?.location} classNameWrap='flex-1' />
            <Item label='Date' value={convertUTCDate(generalInfo?.date)} classNameWrap='flex-1' />
          </View>
          <Item label='Project' value={generalInfo?.project} />
          <View className='flex-row'>
            <Item label='Site Team Leader' value={generalInfo?.leader?.label} classNameWrap='flex-1' />
            <Item label='Principal Contractor' value={generalInfo?.contractor} classNameWrap='flex-1' />
          </View>
          <Item label='Safe Work Method Statement' value={generalInfo?.methodStatement?.label} />
          <Item label='Description of Work' value={generalInfo?.description} />
        </View>
        {/* First aid */}
        <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>First Aid</Text>
          <Item label='Name of on-site First Aider' value={firstAid?.name} />
          <Item label='First Aid Box Location' value={firstAid?.firstAidLocation} />
          <Item label='Location of Nearest Hospital' value={firstAid?.hospitalLocation} />
          <Item label='Emergency Assembly Point' value={firstAid?.assemblyPoint} />
        </View>
        {/* Check list */}
        <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>Team Site Leader Pre-start Check list</Text>
          {checkList?.checklist?.map((item, index) => (
            <View className='flex-row items-center gap-x-2' key={index}>
              <Image source={images.checked} className='w-6 h-6' />
              <Text key={index} className='text-[14px]'>
                {checkListTemp.find((temp) => temp.key === item)?.title}
              </Text>
            </View>
          ))}
        </View>
        {/* First aid */}
        <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>Daily Sign off</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}