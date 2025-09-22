import { QUERY_KEY } from '@constants/keys.constants';
import { getIncidentReportApi } from '@services/incident.service';
import { useQuery } from '@tanstack/react-query';

export const useGetIncidentDetail = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.INCIDENT_REPORT,id],
    queryFn: () => getIncidentReportApi(id),
    enabled: !!id,
  });
  return query;
};
