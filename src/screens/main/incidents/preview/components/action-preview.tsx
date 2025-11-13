import HeaderPreview from '@components/common/header-preview'
import { ValueItem } from '@components/common/value-item'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import React from 'react'
import { View } from 'react-native'
import { PreviewProps } from '../../config.incident'
import { IncidentSteps, useIncidentContext } from '../../context'

const width = 'w-[50%]'
export default function ActionPreview({ allowEdit, incident }: PreviewProps) {
  const { incident: { action }, setIncident } = useIncidentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateIncident, { editingMode: true }))
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Action }))
  }

  const actions = action?.actions?.filter((item) => !!item.description) || incident?.immediate_actions

  return (
    <View className='mt-4 sm:mt-8 bg-white rounded-[20px]'>
      <HeaderPreview
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
            {actions?.map((item, index) => (
              <View className={`sm:flex-row gap-4 ${index + 1 !== actions?.length ? 'border-b border-neutral30 pb-8' : 'pb-4'}`} key={index}>
                <ValueItem label='Immediate Action Taken' value={item.name} classNameWrap={`${width}`} />
                <ValueItem label='Action Description' value={item.description} classNameWrap={`${width}`} />
              </View>
            ))}
          </View>
        </>
      }
    </View>
  )
}