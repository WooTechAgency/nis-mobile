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
import { getLastPartOfUrl } from '@utils/functions.util.ts'
import { isIpad } from '@constants/app.constants.ts'
import { ValueItem } from '@components/common/value-item.tsx'

export default function WitnessPreview({ allowEdit, incident }: PreviewProps) {
  const { incident: { witness }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Witness }))
  }

  return (
    <View className='mt-4 sm:mt-8 bg-white rounded-[20px]'>
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
            className={`${isIpad ? flatListClassName : 'px-6 py-5 gap-y-4'}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={witness?.witnesses || incident?.witnesses}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text className='ml-4 mt-2 text-neutral60'>No witnesses provided</Text>}
            ListHeaderComponent={
              isIpad ? (
                <View className={`${headerClassName} gap-x-2`}>
                  <Text className={`${labelClassName} w-[23%]`}>{'Name'}</Text>
                  <Text className={`${labelClassName} w-[23%]`}>{'Phone'}</Text>
                  <Text className={`${labelClassName} w-[23%]`}>{'Email'}</Text>
                  <Text className={`${labelClassName} grow`}>{'Statement provided?'}</Text>
                </View>
              ) : null
            }
            renderItem={({ item, index }: { item: Witness, index: number }) => (
              isIpad ? (
                <View className={`${itemClassName}  gap-x-2 ${index !== (witness?.witnesses.length || incident?.witnesses.length || 0) - 1 && 'border-b'}`}>
                  <Text className={`${labelClassName} w-[23%]`}>{item?.name}</Text>
                  <Text className={`${labelClassName} w-[23%]`}>{item?.phone}</Text>
                  <Text className={`${labelClassName} w-[23%]`}>{item?.email}</Text>
                  <View className={`grow shirnk flex-1`}>
                    {/* khi chua submit -> documents, khi submit -> medias */}
                    {(item.documents && item.documents.length > 0 || item.medias && item.medias.length > 0) && (
                      <View className='gap-2'>
                        {(item.documents || item.medias).map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            className='flex-row items-center gap-x-2'
                            onPress={() => navigate(RouteName.ShowDocument, { url: item?.url as string })}
                          >
                            <View className='w-1 h-1 bg-neutral70 rounded-full' />
                            <Text className={`underline ${labelClassName} `}>{item?.name || item?.original_filename || getLastPartOfUrl(item.path)}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              ) : (
                <View className='gap-y-4'>
                  <ValueItem label='Name' value={item?.name} />
                  <ValueItem label='Phone' value={item?.phone} />
                  <ValueItem label='Email' value={item?.email} />
                  <View className={`grow shirnk flex-1`}>
                    {/* khi chua submit -> documents, khi submit -> medias */}
                    {(item.documents && item.documents.length > 0 || item.medias && item.medias.length > 0) ? (
                      <>
                        <Text className='text-[12px] text-neutral40 mb-1'>Statement provided?</Text>
                        <View className='gap-2'>
                          {(item.documents || item.medias).map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              className='flex-row items-center gap-x-2'
                              onPress={() => navigate(RouteName.ShowDocument, { url: item?.url as string })}
                            >
                              <View className='w-1 h-1 bg-neutral70 rounded-full' />
                              <Text className={`underline ${labelClassName} `}>{item?.name || item?.original_filename || getLastPartOfUrl(item.path)}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </>
                    ) : <ValueItem label='Statement provided?' value={'No'} />}
                  </View>
                </View>
              )
            )}
          />
        </>
      }
    </View>
  )
}