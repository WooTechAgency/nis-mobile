import { images } from '@assets/images';
import { ValueItem } from '@components/common/value-item';
import { CommonModal } from '@components/modal';
import { Button, Text } from '@components/ui';
import { useToggle } from '@hooks/useToggle';
import React from 'react';
import { Image, View } from 'react-native';
import { HazardForm } from '../steps/step-hazards';

interface Props {
  toggleShowPreview?: () => void
  onDeleteHazard?: (index: number) => void
  index: number,
  hazard: HazardForm
}

interface ValueItem {
  label: string
  value?: string
}

export default function HazardItemPreview({ hazard, toggleShowPreview, onDeleteHazard, index }: Props) {
  const [visibleConfirmDelete, toggleConfirmDelete] = useToggle(false)
  const allowAction = !!onDeleteHazard && !!toggleShowPreview

  return (
    <View className='gap-y-6'>
      <Text className='font-semibold'>{`Hazard ${index + 1}`}</Text>
      <ValueItem
        label='Description'
        value={hazard.description}
      />
      {hazard.medias && hazard.medias.length > 0 &&
        <View className='flex-row flex-wrap gap-x-4 justify-between'>
          {hazard.medias?.map((media, index) => (
            <Image
              key={index}
              source={{ uri: media?.uri }}
              className='rounded-[10px]'
              style={{ width: '32%', height: 0, aspectRatio: 1 }}
              resizeMode="cover"
            />
          ))}
        </View>
      }
      {!allowAction && <View className='w-full h-[1px] bg-neutral30 ' />}
      <View className='flex-row gap-x-6'>
        {[
          { label: 'Likelihood', value: hazard.likelihood },
          { label: 'Consequence ', value: hazard.consequence },
          { label: 'Initial Risk Rating ', value: hazard.initialRiskRating },
          { label: 'Residual Risk ', value: hazard.residualRiskRating },
        ]
          .filter((item) => !!item.value)
          .map((item, index) => (
            <View className='flex-1 gap-1' key={index}>
              <Text className='text-[12px] text-neutral40'>{item.label}</Text>
              <View
                style={{ backgroundColor: item?.value?.bg }}
                className={` h-[48px] bg-teal20 rounded-[14px] justify-center items-center`}
              >
                <Text className='font-medium'>{item?.value?.title}</Text>
              </View>
            </View>
          ))}
      </View>
      {!allowAction && <View className='w-full h-[1px] bg-neutral30 ' />}
      <ValueItem
        label='Consequences'
        value={hazard?.consequenceDes}
      />
      {!allowAction && <View className='w-full h-[1px] bg-neutral30 ' />}
      <ValueItem
        label='Control Measures'
        value={hazard?.controlMeasure}
      />
      {allowAction &&
        <>
          <View className='flex-row gap-x-4'>
            <Button
              label='Edit'
              onPress={toggleShowPreview}
              iconButton={<Image source={images.edit} className='w-8 h-8' />}
              type='outlined'
              className='w-[135px] rounded-[8px] '
              style={{ height: 36 }}
            />
            <Button
              label='Delete'
              iconButton={<Image source={images.trash2} className='w-8 h-8' tintColor={'red'} />}
              type='delete'
              className='w-[135px]'
              onPress={toggleConfirmDelete}
            />
          </View>
          <CommonModal
            visible={visibleConfirmDelete}
            toggleModal={toggleConfirmDelete}
            title='Confirm'
            des='Are you sure you want to delete this hazard'
            btnNegativeText='No'
            btnPositiveText='Yes'
            onPositive={() => onDeleteHazard(index)}
          />
        </>
      }
    </View>
  )
}