import { IPagination } from '@constants/interface';
import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';

const BASE = '/api/jobs';

export interface UpdateJobRequest {

}
export async function updateJobApi(request: UpdateJobRequest): Promise<any> {
  try {
    const response = await baseApi.post(`api/incident-reports`,request);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to create incident' });
    throw e;
  }
}


export interface GetJobsParams extends IPagination{
  site_id?: number
  search_types?: string
  author_id?: number
}

export interface GetJobsResponse {

}
export async function getJobsApi(params: GetJobsParams): Promise<GetJobsResponse> {
  try {
    const response = await baseApi.get(`api/incident-reports`,params);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch incidents' });
    throw e;
  }
}

