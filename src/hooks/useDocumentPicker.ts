import { showError } from '@lib/toast';
import { pick, type DocumentPickerResponse } from '@react-native-documents/picker';
import { uploadFilesApi, UploadMediasDirectory } from '@services/common.service';
import { useLoadingZ } from '@zustand/useLoadingZ';
import { useCallback, useState } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

interface UseDocumentPicker {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
}

export function useDocumentPicker({ name, setValue, control }: UseDocumentPicker) {
  const [error, setError] = useState<string | null>(null);
  const [didCancel, setDidCancel] = useState(false);
  const {setLoading} = useLoadingZ()

  const currentDocs = useWatch({ control, name }) || [];

  const handleResponse = async (response?: DocumentPickerResponse[] | null) => {
    console.log('response ', response)
    setDidCancel(false);
    setError(null);

    if (!response) {
      setDidCancel(true);
      return; 
    }
    try{
      setLoading(true)
      const mediaResult = await uploadFilesApi({ files: response, directory: UploadMediasDirectory.WITNESS })
      // Nếu response là mảng và có file
      if (Array.isArray(response) && response.length > 0) {
        setValue(name, [...currentDocs, {...response[0], id: mediaResult.uploaded_media[0].id} ]);
      } else {
        showError({title: 'Upload documents failed'})
      }
    }catch(err: any){
      showError({title: 'Upload documents failed'})
    }finally{
      setLoading(false)
    }
   
  };

  const pickDocuments = useCallback(
    async () => {
      try {
        if(currentDocs.length >= 5) {
          return showError({ title: 'You can only select up to 5 documents' });
        }
        setError(null);
        setDidCancel(false);
        const docs = await pick();

        handleResponse(docs);
      } catch (err: any) {
        console.log('err ',err?.message)
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
  }, []);

  return {
    error,
    didCancel,
    pickDocuments,
    clear,
    currentDocs
  } as const;
}
