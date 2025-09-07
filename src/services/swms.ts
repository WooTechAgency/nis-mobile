import { ICheckBoxDescription, IPagination } from '@constants/interface';
import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';
import { ISite } from './site.service';
import { IUser } from './user.service';

const BASE = '/api/swms';

export interface CreateIncidentRequest {
  site_id?: number;
  date_of_report?: string; // ISO date (YYYY-MM-DD)
  date_time_of_incident?: string; // ISO datetime (YYYY-MM-DDTHH:mm:ssZ)
  supervisor_on_site?: number;
  incident_types?: {
    incident_type_id: number;
    description: string;
  }[];
  immediate_actions?: {
    immediate_action_id: number;
    description: string;
  }[];
  involved_people?: {
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
    third_party?: boolean;
    injured?: boolean;
    treatment_required?: string;
  }[];
  witnesses?: {
    name?: string;
    email?: string;
    phone?: string;
    media?: number[]; // array of media IDs (image/video)
  }[];
  signatures?: {
    name?: string;
    role?: string;
    signature?: string; // base64 image string
  }[]
}
export async function createIncidentApi(request: CreateIncidentRequest): Promise<any> {
  try {
    const response = await baseApi.post(`api/incident-reports`,request);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch roles' });
    throw e;
  }
}

export interface ISWMS {
  id: number;
  swms_id: string;
  swms_name: string;
  
}

export interface GetSwmsParams extends IPagination{
  site_id: number
}
export async function getSwmsApi(params?: GetSwmsParams): Promise<ISWMS[]> {
  try {
    const response = await baseApi.get(`api/swms`,params);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch SWMS' });
    throw e;
  }
}

