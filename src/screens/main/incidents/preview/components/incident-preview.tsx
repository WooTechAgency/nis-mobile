import HeaderPreview from '@components/common/header-preview'
import { ValueItem } from '@components/common/value-item'
import Title from '@components/title'
import { FlatList, Text } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import React from 'react'
import { View } from 'react-native'
import { PreviewProps, flatListClassName, headerClassName, itemClassName, labelClassName } from '../../config.incident'
import { IncidentSteps, useIncidentContext } from '../../context'
import { InvolvedPerson } from '../../create-incident/steps/step-incident'

const width = 'w-[50%]'
export default function IncidentPreview({ allowEdit }: PreviewProps) {
  const { incident: { incident }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Incident }))
  }

  const incidentTypes = incident?.incidentTypes.filter((item) => !!item.description)

  return (
    <View className='mt-4 bg-white rounded-[20px]'>
      <HeaderPreview
        label='Overview'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        allowEdit={allowEdit}
      />
      {!collapsed &&
        <>
          {/* Person(s) Involved */}
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='px-6 pt-5 gap-y-4'>
            <Title label='Person(s) Involved' className='text-base' />
            <FlatList
              className={`${flatListClassName} mx-0 `}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={incident?.involvedPersons}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={
                <View className={`${headerClassName}`}>
                  <Text className={`${labelClassName} w-[20%]`}>{'Name'}</Text>
                  <Text className={`${labelClassName} w-[20%]`}>{'Role'}</Text>
                  <Text className={`${labelClassName} w-[15%]`}>{'Injury?'}</Text>
                  <Text className={`${labelClassName} grow`}>{'Treatment Required'}</Text>
                </View>
              }
              renderItem={({ item, index }: { item: InvolvedPerson, index: number }) => (
                <View className={`${itemClassName}  ${index !== (incident?.involvedPersons?.length || 0) - 1 && 'border-b'}`}>
                  <Text className={`${labelClassName}  w-[20%]`}>{item?.name}</Text>
                  <Text className={`${labelClassName}  w-[20%]`}>{item?.role}</Text>
                  <Text className={`${labelClassName}  w-[15%]`}>{item?.injured ? 'Yes' : 'No'}</Text>
                  <Text className={`${labelClassName}  grow`}>{item?.treatment || ''}</Text>
                </View>
              )}
            />
          </View>
          {/* Incident Type */}
          <View className='p-6 pt-5 gap-y-4 '>
            <Title label='Incident Type' className='text-base' />
            {incidentTypes?.map((item, index) => (
              <View className={`flex-row gap-x-4 ${index + 1 !== incidentTypes.length ? 'border-b border-neutral30 pb-8' : 'pb-4'}`} key={index}>
                <ValueItem label='Incident Type' value={item.name} classNameWrap={`${width}`} />
                <ValueItem label='Incident Description' value={item.description} classNameWrap={`${width}`} />
              </View>
            ))}
          </View>
        </>
      }

    </View>
  )
}