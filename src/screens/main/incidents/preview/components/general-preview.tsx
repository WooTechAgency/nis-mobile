import HeaderPreview from '@components/common/header-preview'
import { ValueItem } from '@components/common/value-item'
import Title from '@components/title'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { convertDDMMYYYY, convertHHMM } from '@utils/date.util'
import React from 'react'
import { View } from 'react-native'
import { PreviewProps } from '../../config.incident'
import { IncidentSteps, useIncidentContext } from '../../context'

const width = 'w-[50%]'

export default function GeneralPreview({ allowEdit, incident }: PreviewProps) {
  const { incident: { generalInfo }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.General }))
  }


  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <HeaderPreview
        label='Overview'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        allowEdit={allowEdit}
      />
      {!collapsed &&
        <>
          {/* general */}
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='p-6 pt-5 gap-y-4'>
            <Title label='General' className='text-base mb-4' />
            <View className='flex-row gap-x-4'>
              <ValueItem label='Company' value={generalInfo?.company || 'National Installation Solutions (NIS)'} classNameWrap={`${width}`} />
              <ValueItem label='Date of Report' value={convertDDMMYYYY(generalInfo?.dateOfReport || incident?.date_of_report)} classNameWrap={`${width}`} />
            </View>
            <View className='flex-row gap-x-4'>
              <ValueItem label='Completed by' value={generalInfo?.completedBy || incident?.author.full_name} classNameWrap={`${width}`} />
              <ValueItem label='Role / Position' value={generalInfo?.role || incident?.author.role?.name} classNameWrap={`${width}`} />
            </View>
          </View>
          <View className=' h-[1px] bg-neutral20 mx-6 ' />
          {/* incident details */}
          <View className='p-6 pt-5 gap-y-4'>
            <Title label='Incident Detail' className='text-base mb-4' />
            <View className='flex-row gap-x-4'>
              <ValueItem label='Date of Incident' value={convertDDMMYYYY(generalInfo?.dateOfIncident || incident?.date_time_of_incident)} classNameWrap={`${width}`} />
              <ValueItem label='Time of Incident' value={convertHHMM(generalInfo?.timeOfIncident || incident?.date_time_of_incident)} classNameWrap='w-[50%] ' />
            </View>
            <View className='flex-row gap-x-4'>
              <ValueItem label='Site Location' value={generalInfo?.siteLocation.site_name || incident?.site.site_name} classNameWrap={`${width}`} />
              <ValueItem label='Supervision on Site' value={generalInfo?.supervisor.full_name || incident?.supervisor.full_name} classNameWrap={`${width}`} />
            </View>
          </View>
        </>
      }

    </View>
  )
}