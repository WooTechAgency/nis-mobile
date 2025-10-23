import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';

const BASE_SERVICE = '/api/filter-options';

const ApiName = {
  UsersFilterOptions: `${BASE_SERVICE}/user-page`,
  IncidentsFilterOptions: `${BASE_SERVICE}/incident-page`,
  DsraFilterOptions: `${BASE_SERVICE}/dsra-page`,
};

export interface FilterOption {
  id: number;
  name: string;
}
// USER ----  Interface cho filter options response
export interface UserFilterOptions {
  companies: Array<FilterOption>;
  roles: Array<FilterOption>;
  status: Array<FilterOption>;
}

export interface UserFilterOptionsResponse {
  success: boolean;
  data: UserFilterOptions;
  message: string;
  meta: {
    company_id: number;
    role_id: number;
    status: string | null;
    filter_info: {
      description: string;
      available_filters: {
        company_id: string;
        role_id: string;
        status: string;
      };
    };
  };
}

export interface GetUserFilterOptionsParams {
  companies: number;
  roles: number;
  status: string;
}

export async function getUserFilterOptionsApi(params?: GetUserFilterOptionsParams): Promise<UserFilterOptions> {
  try {
    const response = await baseApi.get(ApiName.UsersFilterOptions);
    return response.data?.data;
  } catch (error: any) {
    showErrorMessage({ message: error.message });
    throw error;
  }
}

// INCIDENT ----  Interface cho filter options response
export interface IncidentsFilterOptions {
  sites: Array<FilterOption>;
  incident_types: Array<FilterOption>;
}

export interface IncidentsFilterOptionsResponse {
  success: boolean;
  data: IncidentsFilterOptions;
  message: string;
  meta: {
    site_id: number;
    incident_type_id: number;
    filter_info: {
      description: string;
      available_filters: {
        site_id: string;
        incident_type_id: string;
      };
    };
  };
}

export interface GetIncidentsFilterOptionsParams {  
  site_id: number;
  incident_type_id?: number;
  search?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  date_from?: string;
  date_to?: string;
}

export async function getIncidentsFilterOptionsApi(params?: GetIncidentsFilterOptionsParams): Promise<IncidentsFilterOptions> {
  try {
    const response = await baseApi.get(ApiName.IncidentsFilterOptions);
    return response.data?.data;
  } catch (error: any) {
    showErrorMessage({ message: error.message });
    throw error;
  }
}

export interface DsraFilterOptions {
  sites: Array<FilterOption>;
  team_leaders: Array<FilterOption>;
}
export async function getDsraFilterOptionsApi(): Promise<DsraFilterOptions> {
  try {
    const response = await baseApi.get(ApiName.DsraFilterOptions);
    return response.data?.data; 
  } catch (error: any) {
    showErrorMessage({ message: error.message });
    throw error;
  }
}
