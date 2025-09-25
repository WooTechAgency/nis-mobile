import { useState, useCallback } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { pick, type DocumentPickerResponse } from '@react-native-documents/picker';
import { showErrorMessage } from '@utils/functions.util';
import { showError } from '@lib/toast';

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

  const handleResponse = (response?: DocumentPickerResponse[] | null) => {
    console.log('response ', response)
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
    async () => {
      try {
        if(currentDocs.length >= 5) {
          return showError({ title: 'You can only select up to 5 documents' });
        }
        setLoading(true);
        setError(null);
        setDidCancel(false);
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
