import { images } from '@assets/images';
import { CommonModal } from '@components/modal';
import { useImagePicker } from '@hooks/useImagePicker';
import { useToggle } from '@hooks/useToggle';
import React, { useRef } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { Button } from './Button';
import { Image } from './Image';
import { Text } from './Text';
import { FlatList } from './FlatList';
import { formatBytes } from '@utils/functions.util';

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  errors?: FieldErrors;
  isRadio?: boolean;

}
export function MediaForm(props: Props) {
  const { setValue, name, control, label, classNameWrap, isRadio, labelCls } = props;
  const [visibleDeleteImage, toggleVisibleDeleteImage] = useToggle();
  const selectedDeleteImageRef = useRef<number>(undefined)

  const currentMedias: Asset[] = useWatch({ name, control, })

  const { takePhoto, pickFromLibrary } = useImagePicker({ setValue, control, name, maxImage: 5 })

  const onRemove = () => {
    if (selectedDeleteImageRef.current !== undefined) {
      const newMedias = currentMedias.filter((_: Asset, index: number) => index !== selectedDeleteImageRef.current);
      setValue(name, newMedias);
      selectedDeleteImageRef.current = undefined;
    }
  }

  return (
    <View className={`gap-y-8 ${classNameWrap}`}>
      {currentMedias && currentMedias.length > 0 &&
        <View className='flex-row flex-wrap gap-4'>
          {currentMedias?.map((item, index) => (
            <View className='flex-row items-center  justify-between border border-border bg-neutral10 p-4 rounded-[14px]  w-[48%]' key={index}>
              <View className='row-center gap-x-3 '>
                <Image source={images.document} className='w-9 h-9' />
                <View className='flex-1'>
                  <Text className='text-[12px] font-medium' numberOfLines={1}>{item.fileName}</Text>
                  <View className='row-center gap-x-2'>
                    <Text className='text-[12px] font-medium text-[#A9ACB4]'>{formatBytes(item.fileSize)}</Text>
                    <Image source={images.complete} className='w-[18px] h-[18px]' />
                    <Text className='text-[12px] text-[#292D32]'>Completed</Text>
                  </View>
                </View>
                <Image
                  source={images.trash}
                  className='w-8 h-8'
                  onPress={() => {
                    selectedDeleteImageRef.current = index;
                    toggleVisibleDeleteImage();
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      }
      <Button
        onPress={() => pickFromLibrary()}
        label='Upload image'
        iconButton={<Image source={images.upload} className='w-8 h-8' />}
        type='action'
      />
      <CommonModal
        visible={visibleDeleteImage}
        toggleModal={toggleVisibleDeleteImage}
        title='Delete Image'
        des='Are you sure you want to delete this image'
        btnPositiveText='Delete'
        btnNegativeText='Cancel'
        onPositive={onRemove}
      />
    </View>
  );
}
