import { DocumentPickerResponse } from '@react-native-documents/picker';
import { showErrorMessage } from '@utils/functions.util';
import { Asset } from 'react-native-image-picker';
import baseApi from '.';

export enum UploadMediasDirectory {
  PROFILE = 'profile-images',
  WITNESS = 'witness_attachments',
  HAZARD = 'hazard_attachments',
}
export interface UploadMediasRequest {
  files: DocumentPickerResponse[] | Asset[];
  directory: UploadMediasDirectory
}
export interface UploadedMedia {
  id:number
  path:string
  mediable_type:string
  mediable_id:string
  author_id:number
  url:string
  created_at:string
  updated_at:string
}
export interface UploadMediasResponse {
  total_files: number;
  successful_uploads: number;
  uploaded_media: UploadedMedia[];
}


export async function uploadFilesApi({files,directory}: UploadMediasRequest): Promise<UploadMediasResponse> {
  try {
    var formData = new FormData();
    directory && formData.append('directory', directory || '');
    if (files.length > 0) {
      for (const media of files) {
        let formatedFile
        if(media.name){
          // document
           formatedFile = {
            name: media.name,
            type: media.type,
            uri: media.uri,
            size: media.size,
          };
        }else{
          // media
          formatedFile = {
            name: media.fileName,
            type: media.type,
            uri: media.uri,
            size: media.fileSize,
          };
        }
        formData.append('files[]', formatedFile);
      }
    }
    
    console.log('formData ', formData)
    const response = await baseApi.postFormData(`api/media/upload`, formData);
    return response.data?.data;
  } catch (error: any) {
    showErrorMessage({ message: error?.response?.data?.message || 'Upload documents failed' });
    throw error;
  }
}