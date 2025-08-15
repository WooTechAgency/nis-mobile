import Title from '@components/title'
import { useToggle } from '@hooks/useToggle'
import { goBack } from '@routes/navigationRef'
import { convertDDMMYYYY, convertHHMM } from '@utils/date.util'
import React from 'react'
import { View } from 'react-native'
import { IncidentSteps, useIncidentContext } from '../../context'
import Footer from './footer'
import { Item } from './item'
import { PreviewProps } from '../../config.incident'

const width = 'w-[50%]'

export default function GeneralPreview({ allowEdit }: PreviewProps) {
  const { incident: { generalInfo }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    goBack()
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.General }))
  }

  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <Footer
        label='General'
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
            <Title label='General' className='text-base' />
            <View className='flex-row gap-x-4'>
              <Item label='Company' value={generalInfo?.company} classNameWrap={`${width}`} />
              <Item label='Date of Report' value={convertDDMMYYYY(generalInfo?.dateOfReport)} classNameWrap={`${width}`} />
            </View>
            <View className='flex-row gap-x-4'>
              <Item label='Completed by' value={generalInfo?.completedBy} classNameWrap={`${width}`} />
              <Item label='Role / Position' value={'dsa'} classNameWrap={`${width}`} />
            </View>
          </View>
          <View className=' h-[1px] bg-neutral20 mx-6 ' />
          {/* incident details */}
          <View className='p-6 pt-5 gap-y-4'>
            <Title label='Incident Detail' className='text-base' />
            <View className='flex-row gap-x-4'>
              <Item label='Date of Incident' value={convertDDMMYYYY(generalInfo?.dateOfIncident)} classNameWrap={`${width}`} />
              <Item label='Time of Incident' value={convertHHMM(generalInfo?.timeOfIncident)} classNameWrap='w-[50%] ' />
            </View>
            <View className='flex-row gap-x-4'>
              <Item label='Site Location' value={generalInfo?.siteLocation} classNameWrap={`${width}`} />
              <Item label='Supervision on Site' value={generalInfo?.supervisor} classNameWrap={`${width}`} />
            </View>
          </View>
        </>
      }

    </View>
  )
}