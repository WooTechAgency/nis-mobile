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


export default function SignOffPreview({ allowEdit, incident }: PreviewProps) {
  const { incident: { singing }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Action }))
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
            className={`${flatListClassName}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={singing?.signees || incident?.signatures}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View className={`${headerClassName}`}>
                <Text className={`${labelClassName} w-[25%]`}>{'Name'}</Text>
                <Text className={`${labelClassName} w-[25%]`}>{'Role'}</Text>
                <Text className={`${labelClassName} w-[25%]`}>{'Time & Date'}</Text>
                <Text className={`${labelClassName} w-[25%]`}>{'Signature'}</Text>
              </View>
            }
            renderItem={({ item, index }: { item: Signee, index: number }) => (
              <View className={`${itemClassName} ${index !== (singing?.signees?.length || incident?.signatures?.length || 0) - 1 && 'border-b'}`}>
                <Text className={`${labelClassName}  w-[25%]`}>{item?.name}</Text>
                <Text className={`${labelClassName}  w-[25%]`}>{item?.role?.name || item?.role}</Text>
                <Text className={`${labelClassName}  w-[25%]`}>{convertHHMMSSDDMMYYYY(item?.timestamp || item.created_at)}</Text>
                <Image source={{ uri: item?.signature }} className=" w-[25%] h-[31px]" resizeMode='cover' />
              </View>
            )}
          />
        </>
      }
    </View>
  )
}