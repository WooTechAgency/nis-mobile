import { QUERY_KEY } from '@constants/keys.constants';
import { GetSwmsParams, getSwmsApi } from '@services/swms';
import { useQuery } from '@tanstack/react-query';

export const useGetSwms = (params?: GetSwmsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SWMS,params],
    queryFn: () => getSwmsApi(params),
  });
  return query;
};
