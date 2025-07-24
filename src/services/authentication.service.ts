import baseApi from './index';

export interface IPostApi {
  status: string;
  message: string;
  data: any;
}

export interface LoginApiRequest {
  email: string;
  password: string;
}
export async function loginApi(request: LoginApiRequest): Promise<IPostApi> {
  try {
    const response = await baseApi.post('/api/installer/login', request);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function forgotPasswordApi(request: ForgotApiRequest): Promise<IPostApi> {
  try {
    const response = await baseApi.post('/api/forgot-password', request);
    return response.data;
  } catch (error: any) {
    // showPopupError(error.message, "Oops! We Couldn't Find That Email", 'Try again');
    throw error;
  }
}

export async function enterCodedApi(request: EnterCodeApiRequest): Promise<IPostApi> {
  try {
    const response = await baseApi.post('/api/check-forget-token', request);
    return response.data;
  } catch (error: any) {
    // showPopupError(error.message, 'Incorrect Reset Code', 'Try again');
    throw error;
  }
}

export async function changePasswordApi(request: ChangePasswordApiRequest): Promise<IPostApi> {
  try {
    const response = await baseApi.patch(`/api/users/${request.userId}/change-password`, request.password);
    return response.data;
  } catch (error: any) {
    // showPopupError(error.message);
    throw error;
  }
}

export async function resetPasswordApi(request: ResetPasswordApiRequest): Promise<IPostApi> {
  try {
    const response = await baseApi.post(`/api/reset-password`, request);
    return response.data;
  } catch (error: any) {
    // showPopupError(error.message);
    throw error;
  }
}

export async function logoutApi(): Promise<ResponseApi> {
  try {
    const response = await baseApi.post(`/api/logout`);
    return response.data;
  } catch (error: any) {
    showPopupError(error.message);
    throw error;
  }
}
