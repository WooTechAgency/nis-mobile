import Title from '@components/title'
import { useToggle } from '@hooks/useToggle'
import { goBack } from '@routes/navigationRef'
import React from 'react'
import { View } from 'react-native'
import { IncidentSteps, useIncidentContext } from '../../context'
import Footer from './footer'
import { Item } from './item'
import { PreviewProps } from '../../config.incident'

const width = 'w-[50%]'
export default function IncidentPreview({ allowEdit }: PreviewProps) {
  const { incident: { incident }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    goBack()
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Incident }))
  }

  return (
    <View className='mt-4 bg-white rounded-[20px]'>
      <Footer
        allowEdit={allowEdit}
        label='Incident'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      {!collapsed &&
        <>
          {/* Person(s) Involved */}
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='p-6 pt-5 gap-y-4'>
            <Title label='Person(s) Involved' className='text-base' />
            {/* TODO - waiting */}
          </View>
          <View className=' h-[1px] bg-neutral20 mx-6 ' />
          {/* Incident Type */}
          <View className='p-6 pt-5 gap-y-4'>
            <Title label='Incident Detail' className='text-base' />
            <View className='flex-row gap-x-4'>
              <Item label='Incident Type' value={incident?.injury ? 'Injury /  Illness' : ''} classNameWrap={`${width}`} />
              <Item label='Incident Description' value={incident?.injuryDes} classNameWrap={`${width}`} />
            </View>
          </View>
        </>
      }

    </View>
  )
}