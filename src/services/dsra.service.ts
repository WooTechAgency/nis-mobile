import { IPagination, IPaginationResponse } from '@constants/interface';
import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';
import { UploadedMedia } from './common.service';
import { Signature } from './incident.service';
import { ISite } from './site.service';
import { IUser } from './user.service';




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
  hazards: UpdateHazardRequest[]
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

export interface UpdateHazardRequest{
  description: string,
  likelihood: string,
  consequence: string, 
  consequence_description: string,
  initial_risk_rating: string,
  control_measure: string,
  residual_risk_rating: string,
  medias : number[]
}
export async function addMoreHazardsApi(dsraId: number, request: UpdateHazardRequest[]): Promise<any> {
  try {
    const response = await baseApi.put(`api/dsras/${dsraId}`,{
      hazards: request
    });
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
  site_id?: number
  search_types?: string
  author_id?: number
}

export interface GetDsraResponse {
  data: DSRA[]
  meta: IPaginationResponse
}
export async function getDsraApi(params?: GetSwmsParams): Promise<GetDsraResponse> {
  try {
    const response = await baseApi.get(`api/dsras`,params);
    return response.data
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

