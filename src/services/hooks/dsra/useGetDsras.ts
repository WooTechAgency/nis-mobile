import { QUERY_KEY } from '@constants/keys.constants';
import { GetSwmsParams, getDsraApi } from '@services/dsra.service';
import { useQuery } from '@tanstack/react-query';

export const useGetDsras = (params?: GetSwmsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DSRAS, params],
    queryFn: () => getDsraApi(params),
  });
  return query;
};

