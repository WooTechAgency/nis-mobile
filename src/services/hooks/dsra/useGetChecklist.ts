import { QUERY_KEY } from '@constants/keys.constants';
import { getPreStartChecklistsApi } from '@services/dsra.service';
import { useQuery } from '@tanstack/react-query';

export const useGetChecklist = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.CHECKLIST,],
    queryFn: () => getPreStartChecklistsApi(),
    staleTime: Infinity,
  });
  return query;
};
