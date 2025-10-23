import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';

const BASE = '/api/roles';

export interface IRole {
  id: number,
  name: string
  description: string
}

export async function getRolesApi(): Promise<IRole[]> {
  try {
    const response = await baseApi.get(`${BASE}/basic`);
    return response.data.data
  } catch (e: any) {
    showErrorMessage({ message: e?.response?.data?.message || 'Failed to fetch roles' });
    throw e;
  }
}


