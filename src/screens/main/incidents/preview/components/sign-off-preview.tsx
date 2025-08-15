import { FlatList, Text } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { View } from 'react-native'
import { IncidentSteps, useIncidentContext } from '../../context'
import { WitnessForm } from '../../create-incident/steps/step-witness'
import { PreviewProps, flatListClassName, headerClassName, itemClassName, labelClassName } from '../../config.incident.ts'
import Footer from './footer'
import { convertHHMMSSDDMMYYYY } from '@utils/date.util'


export default function SignOffPreview({ allowEdit }: PreviewProps) {
  const { incident: { singing }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    goBack()
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Action }))
  }

  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <Footer
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
            data={singing}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View className={`${headerClassName}`}>
                <Text className={`${labelClassName} w-[23%]`}>{'Name'}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{'Role'}</Text>
                <Text className={`${labelClassName} grow`}>{'Time & Date'}</Text>
                <Text className={`${labelClassName} w-[20%]`}>{'Signature'}</Text>
              </View>
            }
            renderItem={({ item }: { item: Signee }) => (
              <View className={`${itemClassName}`}>
                <Text className={`${labelClassName} w-[23%]`}>{item?.name}</Text>
                <Text className={`${labelClassName} w-[23%]`}>{item?.role.label}</Text>
                <Text className={`${labelClassName} grow`}>{convertHHMMSSDDMMYYYY(item.timestamp)}</Text>
                {/* <Text className={`${labelClassName} w-[20%]`}>{item?.email || '0123'}</Text> */}
              </View>
            )}
          />

        </>
      }

    </View>
  )
}