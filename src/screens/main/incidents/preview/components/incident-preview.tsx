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
import { isIpad, isIphone } from '@constants/app.constants'

const width = 'w-[50%]'
export default function IncidentPreview({ allowEdit, incident: data }: PreviewProps) {
  const { incident: { incident }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Incident }))
  }

  const incidentTypes = incident?.incidentTypes.filter((item) => !!item.description) || data?.incident_types

  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <HeaderPreview
        label='Incident'
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
              className={`${isIpad && flatListClassName} mx-0 `}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={incident?.involvedPersons || data?.involved_people}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={
                isIpad ? (
                  <View className={`${headerClassName} gap-x-2`}>
                    <Text className={`${labelClassName} w-[20%]`}>{'Name'}</Text>
                    <Text className={`${labelClassName} w-[20%]`}>{'Role'}</Text>
                    <Text className={`${labelClassName} w-[15%]`}>{'Injury?'}</Text>
                    <Text className={`${labelClassName} grow`}>{'Treatment Required'}</Text>
                  </View>
                ) : null
              }
              renderItem={({ item, index }: { item: InvolvedPerson, index: number }) => (
                isIpad ? (
                  <View className={`${itemClassName} gap-x-2 ${index !== (incident?.involvedPersons?.length || data?.involved_people?.length || 0) - 1 && 'border-b'}`}>
                    <Text className={`${labelClassName} w-[20%]`}>{item?.name}</Text>
                    <Text className={`${labelClassName} w-[20%]`}>{item?.role}</Text>
                    <Text className={`${labelClassName} w-[15%]`}>{item?.injured ? 'Yes' : 'No'}</Text>
                    <Text className={`${labelClassName} grow shrink `}>{item?.treatment || item?.treatment_required || ''}</Text>
                  </View>
                ) :
                  <View className='gap-y-4'>
                    <ValueItem label='Name' value={item?.name} classNameWrap={`${width}`} />
                    <ValueItem label='Role' value={item?.role} classNameWrap={`${width}`} />
                    <ValueItem label='Injury?' value={item?.injured ? 'Yes' : 'No'} classNameWrap={`${width}`} />
                    <ValueItem label='Treatment Required' value={item?.treatment || item?.treatment_required || ''} classNameWrap={`${width}`} />
                  </View>
              )}
            />
          </View>
          {/* Incident Type */}
          {isIphone && <View className='mx-6 h-[1px] bg-neutral20 mt-6' />}
          <View className='p-6 pt-5 gap-y-4 '>
            <Title label='Incident Type' className='text-base' />
            {incidentTypes?.map((item, index) => (
              <View className={`sm:flex-row gap-4 ${index + 1 !== incidentTypes.length ? 'border-b border-neutral30 pb-8' : 'pb-4'}`} key={index}>
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