import HeaderPreview from '@components/common/header-preview.tsx'
import { FlatList, Image, Text } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types.ts'
import { convertHHMMSSDDMMYYYY } from '@utils/date.util'
import React from 'react'
import { View } from 'react-native'
import { PreviewProps, flatListClassName, headerClassName, itemClassName, labelClassName } from '../../config.incident.ts'
import { IncidentSteps, useIncidentContext } from '../../context'
import { Signee } from '../../create-incident/steps/step-sign-off.tsx'
import { isIpad } from '@constants/app.constants.ts'
import { ValueItem } from '@components/common/value-item.tsx'


export default function SignOffPreview({ allowEdit, incident }: PreviewProps) {
  const { incident: { singing }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.SignOff }))
  }

  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <HeaderPreview
        allowEdit={allowEdit}
        label='Sign off'
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
            data={singing?.signees || incident?.signatures}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text className='ml-4 mt-2 text-neutral60'>No sign offs provided</Text>}
            ListHeaderComponent={
              isIpad ? (
                <View className={`${headerClassName}`}>
                  <Text className={`${labelClassName} w-[25%]`}>{'Name'}</Text>
                  <Text className={`${labelClassName} w-[25%]`}>{'Role'}</Text>
                  <Text className={`${labelClassName} w-[25%]`}>{'Time & Date'}</Text>
                  <Text className={`${labelClassName} w-[25%] `}>{'Signature'}</Text>
                </View>
              ) : null
            }
            renderItem={({ item, index }: { item: Signee, index: number }) => (
              isIpad ? (
                <View className={`${itemClassName} ${index !== (singing?.signees?.length || incident?.signatures?.length || 0) - 1 && 'border-b'}`}>
                  <Text className={`${labelClassName}  w-[25%]`}>{item?.name}</Text>
                  <Text className={`${labelClassName}  w-[25%]`}>{item?.role?.name || item?.role}</Text>
                  <Text className={`${labelClassName}  w-[25%]`}>{convertHHMMSSDDMMYYYY(item?.timestamp || item.created_at)}</Text>
                  <Image source={{ uri: item?.signature }} className=" w-[25%] h-[31px]" resizeMode='cover' />
                </View>
              ) : (
                <View className={`gap-y-4 pt-4 ${index + 1 !== (singing?.signees?.length || incident?.signatures?.length || 0) && 'border-b border-neutral30 pb-4'}`}>
                  <ValueItem label='Name' value={item?.name} />
                  <ValueItem label='Role' value={item?.role?.name || item?.role} />
                  <ValueItem label='Time & Date' value={convertHHMMSSDDMMYYYY(item?.timestamp || item.created_at)} />
                  <ValueItem label='Signature' />
                  <Image source={{ uri: item?.signature }} className=" w-[25%] h-[31px] -mt-4" resizeMode='cover' />
                </View>
              )
            )}
          />
        </>
      }
    </View>
  )
}