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
  // const [assets, setAssets] = useState<Asset[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [didCancel, setDidCancel] = useState(false);

  const currentMedias = useWatch({control, name}) || [];

  const handleResponse = (response: ImagePickerResponse) => {
    setLoading(false);
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
      setValue(name, [...currentMedias,...response.assets]);
    }
  };

  const pickFromLibrary = useCallback(
    (options?: ImageLibraryOptions) => {
      setLoading(true);
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
      setLoading(true);
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
    setLoading(false);
  }, []);

  return {
    error,
    loading,
    didCancel,
    pickFromLibrary,
    takePhoto,
    clear,
  } as const;
}

// const { assets, loading, error, pickFromLibrary, takePhoto, clear } = useImagePicker();
