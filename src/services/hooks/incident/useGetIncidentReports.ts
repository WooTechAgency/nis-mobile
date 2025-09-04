import { QUERY_KEY } from '@constants/keys.constants';
import { GetIncidentParams, getIncidentReportsApi, getIncidentTypesApi } from '@services/incident.service';
import { useQuery } from '@tanstack/react-query';

export const useGetIncidentReports = (params?: GetIncidentParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.INCIDENT_REPORTS,params],
    queryFn: () => getIncidentReportsApi(params),
  });
  return query;
};
