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
}
export function useImagePicker({name,setValue,control}: UseImagePicker) {
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
      try{
        setLoading(true)
        // upload image to server
        const mediaResult = await uploadFilesApi({ files: response.assets, directory: UploadMediasDirectory.HAZARD })
        setValue(name, [...currentMedias,...response.assets.map(asset => ({...asset, id: mediaResult.uploaded_media[0].id})) ]);
      }finally{
        setLoading(false)
      }
    }
  };

  const pickFromLibrary = useCallback(
    (options?: ImageLibraryOptions) => {
      setError(null);
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 10,
          includeBase64: false,
          ...options,
        },
        handleResponse,
      );
    },
    [currentMedias],
  );

  const takePhoto = useCallback(
    (options?: CameraOptions) => {
      setError(null);
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          ...options,
        },
        handleResponse,
      );
    },
    [],
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
