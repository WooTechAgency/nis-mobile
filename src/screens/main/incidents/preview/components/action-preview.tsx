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
export default function ActionPreview({ allowEdit }: PreviewProps) {
  const { incident: { action }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    goBack()
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Action }))
  }

  return (
    <View className='mt-8 bg-white rounded-[20px]'>
      <Footer
        allowEdit={allowEdit}
        label='Action'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      {!collapsed &&
        <>
          {/* general */}
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='p-6 pt-5 gap-y-4'>
            <View className='flex-row gap-x-4'>
              <Item label='Immediate Action Taken' value={action?.firstAid && 'First aid administered'} classNameWrap={`${width}`} />
              <Item label='Date of Report' value={'Action Description'} classNameWrap={`${width}`} />
            </View>
          </View>
        </>
      }

    </View>
  )
}