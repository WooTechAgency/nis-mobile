import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';


const BASE_SERVICE = '/api/users';

const ApiName= {
   User: `${BASE_SERVICE}`,
   ChangePassword: `${BASE_SERVICE}/change-password`,
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
}
export async function updateUserApi(userId: number,request: UpdateUserRequest): Promise<any> {
  const {name, phone} = request
  try {
    var formData = new FormData();
   formData.append('_method', 'PUT');
    if (name) formData.append('name', name);
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
export async function changePasswordApi(request: ChangePasswordRequest): Promise<any> {
  try {
    const response = await baseApi.post(ApiName.ChangePassword, request);
    return response.data?.data;
  } catch (error: any) {
    showErrorMessage({ message: error.message })
    throw error;
  }
}