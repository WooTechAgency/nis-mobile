import { QUERY_KEY } from '@constants/keys.constants';
import { Action } from '@screens/main/incidents/create-incident/steps/step-action';
import { getTakenActionsApi } from '@services/incident.service';
import { useQuery } from '@tanstack/react-query';

export const useGetTakenActions = (selectedActions: Action[]) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.TAKEN_ACTIONS],
    queryFn: () => getTakenActionsApi(),
    select(data) {
        return data.map((item)=> {
          return {...item, 
            selected: selectedActions?.find((action) => action.id === item.id)?.selected || false, 
            description: selectedActions?.find((action) => action.id === item.id)?.description || '' }
        })
    },
    staleTime: Infinity,
  });
  return query;
};
