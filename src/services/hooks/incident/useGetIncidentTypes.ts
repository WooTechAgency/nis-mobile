import { QUERY_KEY } from '@constants/keys.constants';
import { getIncidentTypesApi } from '@services/incident.service';
import { useQuery } from '@tanstack/react-query';

export const useGetIncidentTypes = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.INCIDENT_TYPES],
    queryFn: () => getIncidentTypesApi(),
    select(data) {
      return data.map((item)=> {
        return {...item, selected: false, label: item.name, value: item.id }
      })
  },
    // staleTime: Infinity,
  });
  return query;
};
