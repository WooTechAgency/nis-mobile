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
import { useDocumentPicker } from '@hooks/useDocumentPicker';
import { DocumentPickerOptions, DocumentPickerResponse } from '@react-native-documents/picker';
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
export function DocumentForm(props: Props) {
  const { setValue, name, control, classNameWrap, } = props;
  const [visibleDeleteImage, toggleVisibleDeleteImage] = useToggle();
  const selectedDeleteDocumentRef = useRef<number>(undefined)

  const { currentDocs, pickDocuments } = useDocumentPicker({ setValue, control, name })

  const onRemove = () => {
    if (selectedDeleteDocumentRef.current !== undefined) {
      const newMedias = currentDocs.filter((_: DocumentPickerResponse, index: number) => index !== selectedDeleteDocumentRef.current);
      setValue(name, newMedias);
      selectedDeleteDocumentRef.current = undefined;
    }
  }

  return (
    <View className={` ${classNameWrap}`}>
      {currentDocs.length > 0 && currentDocs.map((doc: DocumentPickerResponse, index: number) => (
        <View className='flex-row items-center  justify-between border border-border bg-neutral10 p-4 rounded-[14px] mt-4'>
          <View className='row-center gap-x-3 '>
            <Image source={images.document} className='w-9 h-9' />
            <View className='flex-grow'>
              <Text className='text-[12px] font-medium'>{doc.name}</Text>
              <View className='row-center gap-x-2'>
                <Text className='text-[12px] font-medium text-[#A9ACB4]'>{formatBytes(doc.size)}</Text>
                <Image source={images.complete} className='w-[18px] h-[18px]' />
                <Text className='text-[12px] text-[#292D32]'>Completed</Text>
              </View>
            </View>
            <Image
              source={images.trash}
              className='w-8 h-8'
              onPress={() => {
                selectedDeleteDocumentRef.current = index;
                toggleVisibleDeleteImage();
              }}
            />
          </View>
        </View>
      ))}
      <Button
        label='Upload statement'
        className='mt-4'
        type='outlined'
        iconButton={<Image source={images.upload} className='w-8 h-8' />}
        onPress={pickDocuments}
      />
      <CommonModal
        visible={visibleDeleteImage}
        toggleModal={toggleVisibleDeleteImage}
        title='Delete Document'
        des='Are you sure you want to delete this document'
        btnPositiveText='Delete'
        btnNegativeText='Cancel'
        onPositive={onRemove}
      />
    </View>
  );
}
