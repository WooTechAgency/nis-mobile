import { DocumentPickerResponse } from '@react-native-documents/picker';
import baseApi from '.';
import { showErrorMessage } from '@utils/functions.util';

export enum UploadMediasDirectory {
  PROFILE = 'profile-images',
  WITNESS = 'witness_attachments',
  HAZARD = 'hazard_attachments',
}
export interface UploadMediasRequest {
  medias: DocumentPickerResponse[];
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
export async function uploadMediasApi({medias,directory}: UploadMediasRequest): Promise<UploadMediasResponse> {
  try {
    var formData = new FormData();
    directory && formData.append('directory', directory || '');
    if (medias.length > 0) {
      for (const media of medias) {
        console.log('media ', media)
        // Prefer fileCopyUri (from pick({ copyTo: 'cachesDirectory' })) on iOS
        // to avoid NSCocoaErrorDomain Code=260 (temp Inbox file missing).
        const safeUri = (media as any).fileCopyUri ?? media.uri;
        const normalizedUri = safeUri?.startsWith('file://') ? safeUri : safeUri;

        const formatImage: any = {
          name: media.name || 'document',
          type: media.type || 'application/octet-stream',
          uri: decodeURIComponent(normalizedUri || ''),
          size: media.size,
        };
        console.log('formatImage ', formatImage)
        formData.append('files[]', formatImage);
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