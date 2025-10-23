import { FlatList, Image, Text } from '@components/ui'
import { useToggle } from '@hooks/useToggle'
import { dispatch, goBack } from '@routes/navigationRef'
import React from 'react'
import { View } from 'react-native'
import { convertHHMMSSDDMMYYYY } from '@utils/date.util'
import HeaderPreview from '@components/common/header-preview.tsx'
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context'
import { flatListClassName, headerClassName, itemClassName, labelClassName, PreviewProps } from '@screens/main/incidents/config.incident'
import { SigneeForm } from '../../steps/step-sign-off'
import { useAppSelector } from '@hooks/common'
import { StackActions } from '@react-navigation/native'
import { RouteName } from '@routes/types'


export default function SignOffPreview({ allowEdit, dsra }: PreviewProps) {
  const { assessment: { singing }, setAssessment } = useAssessmentContext()
  const [collapsed, toggleCollapse] = useToggle(false)
  const { userInfo } = useAppSelector((state) => state.authentication)

  const onEdit = () => {
    dispatch(StackActions.popTo(RouteName.CreateDailyAssessment, { editable: true }))
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Signing }))
  }

  const data = dsra?.signatures || [singing?.teamLeader, ...(singing?.signees || [])];

  return (
    <View className='mt-6 bg-white rounded-[20px]'>
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
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View className={`${headerClassName}`}>
                <Text className={`${labelClassName} w-[25%]`}>{'Name'}</Text>
                <Text className={`${labelClassName} w-[25%]`}>{'Role'}</Text>
                <Text className={`${labelClassName} w-[25%]`}>{'Time & Date'}</Text>
                <Text className={`${labelClassName} w-[25%]`}>{'Signature'}</Text>
              </View>
            }
            renderItem={({ item, index }: { item: SigneeForm, index: number }) => (
              <View className={`${itemClassName} ${index !== data.length - 1 && 'border-b'}`}>
                <Text className={`${labelClassName}  w-[25%]`}>{item?.name || userInfo?.full_name}</Text>
                <Text className={`${labelClassName}  w-[25%]`}>{item?.role?.name || userInfo?.role.name}</Text>
                <Text className={`${labelClassName}  w-[25%]`}>{convertHHMMSSDDMMYYYY(item?.timestamp)}</Text>
                <Image source={{ uri: item?.signature }} className=" w-[25%] h-[31px]" resizeMode='cover' />
              </View>
            )}
          />

        </>
      }

    </View>
  )
}