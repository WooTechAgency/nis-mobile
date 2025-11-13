import { IPagination } from '@constants/interface';
import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';

const BASE = '/api/jobs';

export interface UpdateCertificateRequest {

}
export async function updateCertificateApi(request: UpdateCertificateRequest): Promise<any> {
  try {
    const response = await baseApi.put(`api/certificates`,request);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to create certificate' });
    throw e;
  }
}


export interface GetCertificatesParams extends IPagination{
  site_id?: number
  search_types?: string
  author_id?: number
}

export interface GetCertificatesResponse {

}
export async function getCertificatesApi(params: GetCertificatesParams): Promise<GetCertificatesResponse> {
  try {
    const response = await baseApi.get(`api/certificates`,params);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch incidents' });
    throw e;
  }
}

