import { images } from '@assets/images'
import Title from '@components/title'
import { Button, Image } from '@components/ui'
import React from 'react'
import { View } from 'react-native'

interface Props {
  onEdit: () => void
  label: string
  collapsed: boolean
  allowEdit: boolean
  toggleCollapse: () => void
}
export default function HeaderPreview({ onEdit, label, collapsed, toggleCollapse, allowEdit }: Props) {
  return (
    <View className='row-center justify-between px-6 pt-[18px] pb-[22px]'>
      <Title className='' label={label} />
      <View className='row-center gap-x-4'>
        {allowEdit &&
          <Button
            onPress={onEdit}
            iconButton={<Image source={images.edit} />}
            label='Edit'
            type='outlined-small'
            className='w-[135px]'
          />
        }
        <Image
          onPress={toggleCollapse}
          source={collapsed ? images.plus : images.minus}
          className='w-8 h-8'
        />
      </View>
    </View>
  )
}