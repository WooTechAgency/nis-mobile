import { showError } from '@lib/toast';
import { uploadFilesApi, UploadMediasDirectory } from '@services/common.service';
import { useLoadingZ } from '@zustand/useLoadingZ';
import { useState, useCallback } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import {
  launchImageLibrary,
  launchCamera,
  type CameraOptions,
  type ImageLibraryOptions,
  type Asset,
  type ImagePickerResponse,
} from 'react-native-image-picker';

interface UseImagePicker{
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  maxImage?: number
}
export function useImagePicker({name,setValue,control,maxImage}: UseImagePicker) {
  const [error, setError] = useState<string | null>(null);
  const [didCancel, setDidCancel] = useState(false);
  const {setLoading} = useLoadingZ()

  const currentMedias = useWatch({control, name}) || [];
  const handleResponse =  async (response: ImagePickerResponse) => {
    setDidCancel(false);
    setError(null);

    if (response.didCancel) {
      setDidCancel(true);
      return;
    }
    if (response.errorCode || response.errorMessage) {
      setError(response.errorMessage ?? response.errorCode ?? 'Unknown error');
      return;
    }
    if (response.assets) {
      const maxAllowed = maxImage || 5;
      const currentCount = currentMedias.length;
      const newAssetsCount = response.assets.length;
      
      // Check if adding new images would exceed the limit
      if (currentCount + newAssetsCount > maxAllowed) {
        const remainingSlots = maxAllowed - currentCount;
        if (remainingSlots <= 0) {
          showError({ title: 'You can only select up to 5 images' });  
          return;
        }
        showError({ title: 'You can only select up to 5 images' });  
        return;
      }

      try{
        setLoading(true)
        // upload image to server
        const mediaResult = await uploadFilesApi({ files: response.assets, directory: UploadMediasDirectory.HAZARD })
        console.log('mediaResult ', mediaResult)
        setValue(name, [...currentMedias,...response.assets.map((asset,index) => ({...asset, id: mediaResult.uploaded_media[index].id})) ]);
      }finally{
        setLoading(false)
      }
    }
  };

  const pickFromLibrary = useCallback(
    (options?: ImageLibraryOptions) => {
      setError(null);
      const maxAllowed = maxImage || 5;
      const currentCount = currentMedias.length;
      const remainingSlots = maxAllowed - currentCount;
      
      if (remainingSlots <= 0) {
        showError({ title: 'You can only select up to 5 images' });  
        return;
      }
      
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: remainingSlots,
          includeBase64: false,
          ...options,
        },
        handleResponse,
      );
    },
    [currentMedias, maxImage],
  );

  const takePhoto = useCallback(
    (options?: CameraOptions) => {
      setError(null);
      const maxAllowed = maxImage || 5;
      const currentCount = currentMedias.length;
      
      if (currentCount >= maxAllowed) {
        showError({ title: 'You can only select up to 5 images' });  
        return;
      }
      
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          ...options,
        },
        handleResponse,
      );
    },
    [currentMedias, maxImage],
  );

  const clear = useCallback(() => {
    setError(null);
    setDidCancel(false);
  }, []);

  return {
    error,
    didCancel,
    pickFromLibrary,
    takePhoto,
    clear,
  } as const;
}

// const { assets, loading, error, pickFromLibrary, takePhoto, clear } = useImagePicker();
