import { useQuery } from '@tanstack/react-query';
import { getDsraDetailApi } from '@services/dsra.service';
import { QUERY_KEY } from '@constants/keys.constants';

export const useGetDsraDetail = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DSRAS_DETAIL, id],
    queryFn: () => getDsraDetailApi(id),
    enabled: !!id,
  });
  return query;
};