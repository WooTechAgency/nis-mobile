import { showErrorMessage } from '@utils/functions.util';
import baseApi from '.';


const BASE_SERVICE = '/api/users';

const ApiName={
   User: `${BASE_SERVICE}`,
}

export interface UpdateUserRequest {
  _method: string;
  name?: string;
  password?: string;
  email?: string;
}
export async function updateUserApi(userId: number,request: UpdateUserRequest): Promise<any> {
  const {_method,name,password,email} = request
  try {
    var formData = new FormData();
    if (_method) formData.append('_method', _method);
    if (name) formData.append('name', name);
    if (password) formData.append('password', password);
    if (email) formData.append('email', email);
    console.log('formData',formData)

    const response = await baseApi.postFormData(`${ApiName.User}/${userId}`, formData);
    return response.data;
  } catch (error: any) {
    showErrorMessage({ message: error.message })
    throw error;
  }
}