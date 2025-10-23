import { FlatList, Text } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { dispatch, goBack, navigate } from '@routes/navigationRef'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
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
            ListEmptyComponent={<Text className='ml-4 mt-2 text-neutral60'>No witnesses provided</Text>}
            ListHeaderComponent={
              <View className={`${headerClassName} gap-x-2`}>
                <Text className={`${labelClassName} w-[23%]`}>{'Name'}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{'Phone'}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{'Email'}</Text>
                <Text className={`${labelClassName} grow`}>{'Statement provided?'}</Text>
              </View>
            }
            renderItem={({ item, index }: { item: Witness, index: number }) => (
              <View className={`${itemClassName}  gap-x-2 ${index !== (witness?.witnesses.length || incident?.witnesses.length || 0) - 1 && 'border-b'}`}>
                <Text className={`${labelClassName} w-[23%]`}>{item?.name}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{item?.phone}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{item?.email}</Text>
                <View className={`grow `}>
                  {item.documents && item.documents.length > 0 && (
                    <View className='gap-2'>
                      {item.documents.map((document) => (
                        <TouchableOpacity
                          className='flex-row items-center gap-x-2'
                          onPress={() => navigate(RouteName.ShowDocument, { url: document?.url as string })}
                        >
                          <View className='w-1 h-1 bg-neutral70 rounded-full' />
                          <Text className={`underline ${labelClassName}`} key={document.id}>{document.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        </>
      }
    </View>
  )
}