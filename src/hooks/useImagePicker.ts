import { useState, useCallback } from 'react';
import {
  launchImageLibrary,
  launchCamera,
  type CameraOptions,
  type ImageLibraryOptions,
  type Asset,
  type ImagePickerResponse,
} from 'react-native-image-picker';

export function useImagePicker() {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [didCancel, setDidCancel] = useState(false);

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
      setAssets(response.assets);
    }
  };

  const pickFromLibrary = useCallback(
    (options?: ImageLibraryOptions) => {
      setLoading(true);
      setError(null);
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 1,
          includeBase64: false,
          ...options,
        },
        handleResponse,
      );
    },
    [],
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
    setAssets(null);
    setError(null);
    setDidCancel(false);
    setLoading(false);
  }, []);

  return {
    assets,
    error,
    loading,
    didCancel,
    pickFromLibrary,
    takePhoto,
    clear,
  } as const;
}

// const { assets, loading, error, pickFromLibrary, takePhoto, clear } = useImagePicker();
