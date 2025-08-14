import { Config } from '@constants/config.constants';
import { store } from '@store/index';
import axios, { AxiosHeaders, AxiosResponse, HttpStatusCode, RawAxiosRequestHeaders } from 'axios';

export const api = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  const token = config.headers?.Authorization?.toString().replace('Bearer ', '')
  if (!token) {
    const token = store.getState().authentication.userInfo?.token;
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export interface ResponseApi {
  status: string;
  message: string;
  data: any;
  headers: any;
}

const baseApi = {
  post: async (endpoint: string, params?: any, headers?: RawAxiosRequestHeaders | AxiosHeaders) => {
    return api
      .post(endpoint, params, { headers })
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err));
  },
  postFormData: async (endpoint: string, params: any ) => {
    return api
      .post(endpoint, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err));
  },
  get: async (endpoint: string, params?: any) => {
    return api
      .get(endpoint, { params })
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err));
  },
  put: async (endpoint: string, params: any) => {
    return api
      .put(endpoint, params)
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err));
  },
  patch: async (endpoint: string, params?: any) => {
    return api
      .patch(endpoint, params)
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err,));
  },
  delete: async (endpoint: string, params?: any) => {
    return api
      .delete(endpoint, { data: params })
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err,));
  },
  getProfile: async (endpoint: string, token: string) => {
    return api
      .get(endpoint, { headers: { 'Authorization': 'Bearer ' + token } })
      .then((response) => handlingResponse(response))
      .catch((err) => handleError(err));
  },
};

const handlingResponse = (response: AxiosResponse): Promise<ResponseApi> =>
  new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 400) {
      return resolve(response);
    }
    return reject(response);
  });

const handleError = (data: any): Promise<ResponseApi> =>
  new Promise((resolve, reject) => {
    if (axios.isAxiosError(data) && data.response?.status === HttpStatusCode.Unauthorized) {
      // return store.dispatch(setAccessToken(''));
    } else {
      // isShowError && showPopupError(data.response?.data.message);
      return reject(data.response?.data);
    }
  });

export default baseApi;
