import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';
import { ICompany } from './authentication.service';
import { IRole } from './role.service';


const BASE_SERVICE = '/api/users';

const ApiName= {
   User: `${BASE_SERVICE}`,
   ChangePassword: `${BASE_SERVICE}/change-password`,
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
}
export async function updateUserApi(userId: number,request: UpdateUserRequest): Promise<any> {
  const {first_name,last_name, phone} = request
  try {
    var formData = new FormData();
   formData.append('_method', 'PUT');
    if (first_name) formData.append('first_name', first_name);
    if (last_name) formData.append('last_name', last_name);
    if (phone) formData.append('phone', phone);
    const response = await baseApi.postFormData(`${ApiName.User}/${userId}`, formData);
    return response.data?.data;
  } catch (error: any) {
    showErrorMessage({ message: error.message })
    throw error;
  }
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}
export interface ChangePasswordResponse{
  token: string
}
export async function changePasswordApi(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
  try {
    const response = await baseApi.post(ApiName.ChangePassword, request);
    return response.data;
  } catch (error: any) {
    showErrorMessage({ message: error.message })
    throw error;
  }
}
export interface IUser {
  created_at: string;
  email: string;
  id: number
  is_deactive: boolean;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  profile_image: null;
  company: ICompany;
  role: IRole;
}
export async function getUsersApi(): Promise<IUser[]> {
  try {
    const response = await baseApi.get(`${BASE_SERVICE}/basic?per_page=100`);
    return response?.data?.data || [];
  } catch (error: any) {
    showErrorMessage({ message: error.message });
    throw error;
  }
}

export async function getUsersByRoleApi(roleId: number): Promise<IUser[]> {
  try {
    const response = await baseApi.get(`${BASE_SERVICE}/role/${roleId}`);
    return response?.data?.data || [];
  } catch (error: any) {
    showErrorMessage({ message: error.message });
    throw error;
  }
}

export async function getUsersByPermission(): Promise<IUser[]> {
  try {
    const response = await baseApi.get(`${BASE_SERVICE}/device-access`,
      {device_type: 'tablet',});
    return response?.data?.data || [];
  } catch (error: any) {
    showErrorMessage({ message: error.message });
    throw error;
  }
}