import Header from '@components/header'
import { Button, SafeAreaView, ScrollView } from '@components/ui'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useIncidentContext } from '../context'
import ActionPreview from './components/action-preview'
import GeneralPreview from './components/general-preview'
import IncidentPreview from './components/incident-preview'
import WitnessPreview from './components/witness-preview'
import SignOffPreview from './components/sign-off-preview'
import { useToggle } from '@hooks/useToggle'

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
export default function PreviewIncident() {

  const [allowEdit, toggleAlowEdit] = useToggle(false)

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={'DSRA-001'}
          isBack
        />
        <GeneralPreview allowEdit={allowEdit} />
        <IncidentPreview allowEdit={allowEdit} />
        <ActionPreview allowEdit={allowEdit} />
        <WitnessPreview allowEdit={allowEdit} />
        <SignOffPreview allowEdit={allowEdit} />
        <Button
          label={allowEdit ? 'Submit' : 'Edit'}
          className='mt-8'
          onPress={toggleAlowEdit}
        />

        {/* general information */}
        {/* <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>General Information</Text>
          <View className='flex-row'>
            <Item label='Company' value={generalInfo?.location} classNameWrap='flex-1' />
            <Item label='Date of Report' value={convertUTCDate(generalInfo?.date)} classNameWrap='flex-1' />
          </View>
          <Item label='Project' value={generalInfo?.project} />
          <View className='flex-row'>
            <Item label='Site Team Leader' value={generalInfo?.leader?.label} classNameWrap='flex-1' />
            <Item label='Principal Contractor' value={generalInfo?.contractor} classNameWrap='flex-1' />
          </View>
          <Item label='Safe Work Method Statement' value={generalInfo?.methodStatement?.label} />
          <Item label='Description of Work' value={generalInfo?.description} />
        </View> */}
        {/* First aid */}
        {/* <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>First Aid</Text>
          <Item label='Name of on-site First Aider' value={firstAid?.name} />
          <Item label='First Aid Box Location' value={firstAid?.firstAidLocation} />
          <Item label='Location of Nearest Hospital' value={firstAid?.hospitalLocation} />
          <Item label='Emergency Assembly Point' value={firstAid?.assemblyPoint} />
        </View> */}
        {/* Check list */}
        {/* <View className={`${commonWrapCls} mt-4`}>
          <Text className={`${commonTitleCls}`}>Team Site Leader Pre-start Check list</Text>
          {checkList?.checklist?.map((item, index) => (
            <View className='flex-row items-center gap-x-2' key={index}>
              <Image source={images.checked} className='w-6 h-6' />
              <Text key={index} className='text-[14px]'>
                {checkListTemp.find((temp) => temp.key === item)?.title}
              </Text>
            </View>
          ))}
        </View> */}
        {/* First aid */}
      </ScrollView>
    </SafeAreaView>
  )
}