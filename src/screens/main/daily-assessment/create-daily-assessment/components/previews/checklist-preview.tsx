import { images } from '@assets/images'
import HeaderPreview from '@components/common/header-preview'
import { Image, Text } from '@components/ui'
import { shadowStyle } from '@constants/config.constants'
import { PreviewProps } from '@constants/interface'
import { useToggle } from '@hooks/useToggle'
import { StackActions } from '@react-navigation/native'
import { dispatch, goBack } from '@routes/navigationRef'
import { RouteName } from '@routes/types'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import React from 'react'
import { View } from 'react-native'

export default function CheckListPreview({ allowEdit }: PreviewProps) {
  const { assessment: { checkList }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editingMode: true }))
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.CheckList }))
  }

  return (
    <View className='mt-6 bg-white rounded-[20px]' style={shadowStyle}>
      <HeaderPreview
        label='Team Site Leader Pre-start Check list'
        onEdit={onEdit}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        allowEdit={allowEdit}
      />
      {!collapsed &&
        <>
          <View className='w-full h-[1px] bg-neutral20 ' />
          <View className='p-6 pt-5 gap-y-2 -ml-1'>
            {checkList?.checklist?.map((item) => (
              <View
                key={item}
                className={`flex-row items-center gap-x-1 `}
              >
                <Image source={images.checkedDisable} className='w-8 h-8' />
                <Text className=''>{item}</Text>
              </View>
            ))}
          </View>

        </>
      }
    </View>
  )
}