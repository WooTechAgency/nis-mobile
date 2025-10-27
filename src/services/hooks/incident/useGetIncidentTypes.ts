import { QUERY_KEY } from '@constants/keys.constants';
import { IncidentType } from '@screens/main/incidents/create-incident/steps/step-incident';
import { getIncidentTypesApi } from '@services/incident.service';
import { useQuery } from '@tanstack/react-query';

export const useGetIncidentTypes = (selectedIncidentTypes: IncidentType[]) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.INCIDENT_TYPES],
    queryFn: () => getIncidentTypesApi(),
    select(data) {
      return data.map((item)=> {
        return {...item, 
          label: item.name, 
          value: item.id,
          selected: selectedIncidentTypes?.find((incidentType) => incidentType.id === item.id)?.selected || false, 
          description: selectedIncidentTypes?.find((incidentType) => incidentType.id === item.id)?.description || '' }
      })
  },
    // staleTime: Infinity,
  });
  return query;
};
