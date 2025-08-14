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

  const currentMedias = useWatch({ name, control, }) || [];
  console.log('currentMedias ', currentMedias)

  const { takePhoto, pickFromLibrary } = useImagePicker({ setValue, control, name })

  const onRemove = () => {
    if (selectedDeleteImageRef.current !== undefined) {
      const newMedias = currentMedias.filter((_: Asset, index: number) => index !== selectedDeleteImageRef.current);
      setValue(name, newMedias);
      selectedDeleteImageRef.current = undefined;
    }
  }

  return (
    <View className={`flex-row items-center border border-neutral40 px-4 rounded-[14px] gap-x-11 h-[96px] ${classNameWrap}`}>
      {label &&
        <Text className={`text-[12px] text-neutral70 px-1 mb-1 absolute left-4 -top-2 bg-white z-10 ${labelCls}`} >
          {label}
        </Text>
      }
      {/* Yes */}
      <View className='flex-row flex-wrap gap-x-4'>
        <Button className='w-[64px] h-[64px] center border rounded-[4px] border-neutral20' onPress={() => { pickFromLibrary() }}>
          <Image source={images.logo} className='w-8 h-8' />
          <Text className='text-[12px] text-neutral70 '>Upload</Text>
        </Button>
        <ScrollView
          className=''
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {
            currentMedias.length > 0 && currentMedias.map((media: Asset, index: number) => (
              <View key={index} className='mr-4'>
                <Image
                  source={{ uri: media.uri }}
                  resizeMode='cover'
                  className='w-[64px] h-[64px] rounded-[4px]  '
                />
                <Image
                  source={images.close}
                  className='w-4 h-4'
                  classNameButton='absolute  right-1 top-1'
                  onPress={() => {
                    toggleVisibleDeleteImage()
                    selectedDeleteImageRef.current = index
                  }}
                />
              </View>
            ))
          }
        </ScrollView>
      </View>
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
