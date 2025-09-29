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


export const useGetDsrasToday= (params?: GetSwmsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DSRAS_TODAY, params],
    queryFn: () => getDsraApi(params),
    select: (data) => data.map((item) => {
      return {
        ...item,
        id: item.id,
        site_code: item.site.site_code,
        site_name: item.site.site_name,
        hazardsLength: item.hazards?.length,
        status: 'complete',
      }
    }),
  });
  return query;
};

