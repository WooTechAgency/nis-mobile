import { QUERY_KEY } from '@constants/keys.constants';
import { getTakenActionsApi } from '@services/incident.service';
import { getUsersApi } from '@services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useGetTakenActions = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.TAKEN_ACTIONS],
    queryFn: () => getTakenActionsApi(),
    select(data) {
        return data.map((item)=> {
          return {...item, selected: false, }
        })
    },
    staleTime: Infinity,
  });
  return query;
};
