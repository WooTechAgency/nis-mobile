import { showErrorMessage } from '@utils/functions.util';
import baseApi from './index';

const BASE_SERVICE = '/api/auth';

const ApiName={
  Login: `${BASE_SERVICE}/login`,
  ForgotPassword: `${BASE_SERVICE}/forgot-password`,
  CheckToken: `${BASE_SERVICE}/check-token`,
  ResetPassword: `${BASE_SERVICE}/reset-password`,
  Logout: `${BASE_SERVICE}/logout`,
  CurrentUser: `${BASE_SERVICE}/me`,
}

export enum Roles{
  SuperAdmin = 'Super Admin'
}

export interface IRole{
  id: number;
  name:Roles
  company_id:number
}

export interface ICompany{
  id: number;
  name: string
  address: string
  business_number:string
  website: string
  status: number
}

export interface IUser {
  id: number
  first_name: string
  last_name: string
  full_name: string
  email:string
  phone:string
  role: IRole
  permissions: string
  token: string
  role_id: number;
  company_id: number;
  company:ICompany
}
export interface LoginApiRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: IUser;
}

export async function loginApi(request: LoginApiRequest): Promise<LoginResponse> {
  try {
    const response = await baseApi.post(ApiName.Login, request);
    return response.data;
  } catch (error: any) {
    showErrorMessage({ title: 'Login Failed',message: error.message, btnText: 'Try again' })
    throw error;
  }
}

export async function forgotPasswordApi(email: string ): Promise<any> {
  try {
    const response = await baseApi.post('/api/auth/forgot-password',{email} );
    return response.data;
  } catch (error: any) {
    showErrorMessage({message: error.message})
    throw error;
  }
}

interface EnterCodeApiRequest{
  token: string;
  email: string
}
export async function enterCodedApi(request: EnterCodeApiRequest): Promise<any> {
  try {
    const response = await baseApi.post(ApiName.CheckToken, request);
    return response.data;
  } catch (error: any) {
    showErrorMessage({message: error.message})
    throw error;
  }
}

export interface ResetPasswordRequest{
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}
export async function resetPasswordApi(request: ResetPasswordRequest): Promise<any> {
  try {
    const response = await baseApi.post(ApiName.ResetPassword, request);
    return response.data;
  } catch (error: any) {
    showErrorMessage({message: error.message})
    throw error;
  }
}

export async function logoutApi(): Promise<any> {
  try {
    const response = await baseApi.post(ApiName.Logout);
    return response.data;
  } catch (error: any) {
    showErrorMessage({message: error.message})
    throw error;
  }
}

export async function getCurrentUserApi(): Promise<IUser> {
  try {
    const response = await baseApi.get(ApiName.CurrentUser);
    return response.data?.user;
  } catch (error: any) {
    showErrorMessage({message: error.message})
    throw error;
  }
}
