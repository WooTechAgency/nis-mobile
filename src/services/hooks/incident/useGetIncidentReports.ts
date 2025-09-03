import { QUERY_KEY } from '@constants/keys.constants';
import { getIncidentReportsApi, getIncidentTypesApi } from '@services/incident.service';
import { useQuery } from '@tanstack/react-query';

export const useGetIncidentReports = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.INCIDENT_REPORTS],
    queryFn: () => getIncidentReportsApi(),
  });
  return query;
};
