import { IPagination } from '@constants/interface';
import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';
import { ISite } from './site.service';
import { IUser } from './user.service';
import { CheckListForm } from '@screens/main/daily-assessment/create-daily-assessment/steps/step-checklist';
import { Signature } from './incident.service';
import { UploadedMedia } from './common.service';

const BASE = '/api/swms';

export interface CreateAssessmentRequest {
  site_id: number,
  date: string, // ISO date (YYYY-MM-DD)
  team_leader: number,
  project: string,
  first_aid_box_location: string,
  principal_contractor: string,
  description_of_work: string,
  site_first_aider_name: string,
  pre_start_checklists: number[],
  hazards:{
    description: string,
    likelihood: string,
    consequence: string, 
    consequence_description: string,
    initial_risk_rating: string,
    control_measure: string,
    residual_risk_rating: string,
    media : number[]
  }[]
  signatures?: {
    name?: string;
    role?: string;
    signature?: string; // base64 image string
  }[]
}
export async function createAssessmentApi(request: CreateAssessmentRequest): Promise<any> {
  try {
    const response = await baseApi.post(`api/dsras`,request);
    return response.data
  } catch (e: any) {
    showErrorMessage({ message: e?.message  });
    throw e;
  }
}

export interface DSRA {
  id: number
  dsra_code:  string
  site_id:  number
  team_leader:number
  project:string
  principal_contractor:string
  description_of_work:string
  site_first_aider_name:string
  first_aid_box_location:string
  created_at:string 
  updated_at:string
  site:ISite
  team_leader_details:IUser
  pre_start_checklists: GetPreStartChecklist[]
  hazards:{
    id: number
    dsra_id:number
    description: string
    likelihood:string
    consequence:string
    consequence_description:string
    initial_risk_rating:string
    control_measure:string
    residual_risk_rating:string
    created_at:string
    updated_at:string
    media: UploadedMedia[]
  }[]
  signatures: Signature[]
}

export interface GetSwmsParams extends IPagination{
  site_id: number
  search_types: string
}
export async function getDsraApi(params?: GetSwmsParams): Promise<DSRA[]> {
  try {
    const response = await baseApi.get(`api/dsras`,params);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch DSRAs' });
    throw e;
  }
}

export async function getDsraDetailApi(id: number): Promise<DSRA> {
  try {
    const response = await baseApi.get(`api/dsras/${id}`);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch DSRA' });
    throw e;
  }
}

export interface GetPreStartChecklist{
  id: number;
  description: string
}
export async function getPreStartChecklistsApi(params?: GetSwmsParams): Promise<GetPreStartChecklist[]> {
  try {
    const response = await baseApi.get(`api/dsra-pre-start-checklists`,params);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message  });
    throw e;
  }
}

