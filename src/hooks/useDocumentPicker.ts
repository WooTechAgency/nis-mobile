import { useState, useCallback } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { pick, type DocumentPickerResponse, type DocumentPickerOptions } from '@react-native-documents/picker';

interface UseDocumentPicker {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
}

export function useDocumentPicker({ name, setValue, control }: UseDocumentPicker) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [didCancel, setDidCancel] = useState(false);

  const currentDocs = useWatch({ control, name }) || [];

  console.log('currentDocs ',currentDocs)

  const handleResponse = (response?: DocumentPickerResponse[] | null) => {
    setLoading(false);
    setDidCancel(false);
    setError(null);

    if (!response) {
      setDidCancel(true);
      return;
    }

    // Nếu response là mảng và có file
    if (Array.isArray(response) && response.length > 0) {
      setValue(name, [...currentDocs, ...response]);
    } else {
      setError('No documents selected');
    }
  };

  const pickDocuments = useCallback(
    async (options?: DocumentPickerOptions) => {
      try {
        setLoading(true);
        setError(null);
        setDidCancel(false);
        console.log('dmmm')

        const docs = await pick();

        handleResponse(docs);
      } catch (err: any) {
        console.log('err ',err?.message)
        setLoading(false);
        if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
          setDidCancel(true);
        } else {
          setError(err?.message ?? 'Unknown error');
        }
      }
    },
    [currentDocs],
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
    pickDocuments,
    clear,
    currentDocs
  } as const;
}
