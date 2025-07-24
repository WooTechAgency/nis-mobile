import baseApi from 'services';

export async function getExpertiseApi(): Promise<any> {
  try {
    const response = await baseApi.get('/wp/v2/expertise?page=1&per_page=50');
    return response.data;
  } catch (error: any) {
    throw error;
  }
}