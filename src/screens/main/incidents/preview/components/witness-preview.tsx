import { FlatList, Text } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { dispatch, goBack } from '@routes/navigationRef'
import React from 'react'
import { View } from 'react-native'
import { PreviewProps, flatListClassName, headerClassName, itemClassName, labelClassName } from '../../config.incident.ts'
import { IncidentSteps, useIncidentContext } from '../../context'
import { Witness } from '../../create-incident/steps/step-witness'
import HeaderPreview from '@components/common/header-preview.tsx'
import { StackActions } from '@react-navigation/native'
import { RouteName } from '@routes/types.ts'

export default function WitnessPreview({ allowEdit, incident }: PreviewProps) {
  const { incident: { witness }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Witness }))
  }

  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <HeaderPreview
        allowEdit={allowEdit}
        label='Witnesses'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      {!collapsed &&
        <>
          <View className='w-full h-[1px] bg-neutral20 ' />
          <FlatList
            className={`${flatListClassName}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={witness?.witnesses || incident?.witnesses}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text className='ml-4 mt-2 text-neutral60'>Not witnesses found</Text>}
            ListHeaderComponent={
              <View className={`${headerClassName}`}>
                <Text className={`${labelClassName} w-[23%]`}>{'Name'}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{'Phone'}</Text>
                <Text className={`${labelClassName} grow`}>{'Email'}</Text>
                <Text className={`${labelClassName} w-[20%]`}>{'Statement provided?'}</Text>
              </View>
            }
            renderItem={({ item, index }: { item: Witness, index: number }) => (
              <View className={`${itemClassName} ${index !== (witness?.witnesses.length || incident?.witnesses.length || 0) - 1 && 'border-b'}`}>
                <Text className={`${labelClassName} w-[23%]`}>{item?.name}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{item?.phone}</Text>
                <Text className={`${labelClassName} grow`}>{item?.email || '0123'}</Text>
                <Text className={`${labelClassName} w-[20%] underline `}>
                  {((item?.documents && item.documents.length > 0) || (item.medias && item.medias.length > 0)) ? "Yes" : 'No'}
                </Text>
              </View>
            )}
          />
        </>
      }
    </View>
  )
}