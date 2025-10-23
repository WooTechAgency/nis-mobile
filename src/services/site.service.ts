import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';

const BASE = '/api/sites';

export interface SWMS{
  id: number,
  swms_id: string
  swms_name: string
  revision_number: number,
  last_review_date:string
  next_review_date:string
  attachment:string
  created_at: string
  updated_at: string
  days_until_review: number,
  needs_review_soon: boolean,
  is_overdue: boolean
}

export interface ISite {
  id: number,
  site_name: string
  site_code: string
  address:string
  first_aid_box_location: string
  location_of_nearest_hospital: string
  emergency_assembly_point: string
  swms: SWMS
}

export async function getSitesApi(): Promise<ISite[]> {
  try {
    const response = await baseApi.get(`${BASE}/basic?per_page=100`);
    console.log('response', response.data.data)
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch sites' });
    throw e;
  }
}


