import { ICheckBoxDescription, IPagination, IPaginationResponse } from '@constants/interface';
import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';
import { ISite } from './site.service';
import { IUser } from './user.service';
import { IRole } from './role.service';

const BASE = '/api/incidents';

export interface IAction {
  id: number,
  name: string
}

export async function getTakenActionsApi(): Promise<IAction[]> {
  try {
    const response = await baseApi.get(`${BASE}/actions`);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch roles' });
    throw e;
  }
}


export async function getIncidentTypesApi(): Promise<ICheckBoxDescription[]> {
  try {
    const response = await baseApi.get(`${BASE}/types`);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch roles' });
    throw e;
  }
}

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

export interface IncidentReport {
  id: number;
  code: string;
  author: IUser;
  site: ISite;
  date_of_report: string; // ISO date string
  date_time_of_incident: string; // ISO date string
  supervisor: IUser;
  incident_types: ICheckBoxDescription[];
  involved_people: InvolvedPerson[];
  immediate_actions: ICheckBoxDescription[];
  witnesses: Witness[];
  signatures: Signature[];
  created_at: string;
  updated_at: string;
}

 interface Witness {
  id: number;
  name: string;
  phone: string;
  email: string;
  media: [];
}

export interface Signature {
  id: number;
  name: string;
  role: string;
  signature: string;
  created_at: string;
}

export interface InvolvedPerson {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  treatment_required: string;
  third_party: boolean;
  injured: boolean;
  created_at: string;
  updated_at: string;
}
export interface GetIncidentResponse {
  data: IncidentReport[];
  meta: IPaginationResponse;
}
export interface GetIncidentParams extends IPagination{
  site_id?: number
  incident_type_id?: number
  author_id?: number
}
export async function getIncidentReportsApi(params: GetIncidentParams): Promise<GetIncidentResponse> {
  try {
    const response = await baseApi.get(`api/incident-reports`,params);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch incidents' });
    throw e;
  }
}


export async function getIncidentReportApi(id: number): Promise<IncidentReport> {
  try {
    const response = await baseApi.get(`api/incident-reports/${id}`);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch incidents' });
    throw e;
  }
}

