import { PER_PAGE } from '@constants/app.constants';
import { QUERY_KEY } from '@constants/keys.constants';
import { GetIncidentParams, getIncidentReportsApi } from '@services/incident.service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetIncidentReports = (params?: GetIncidentParams) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.INCIDENT_REPORTS,params],
    queryFn: async ({ pageParam }) => {
      return getIncidentReportsApi({
        page: pageParam,
        per_page: PER_PAGE,
        ...params,
      })
    },
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.meta.current_page < lastPage.meta.last_page ? allPages.length + 1 : undefined
    },
    select: (data) => {
      const result = data.pages.map((page) => page.data.flat()).flat();
      return result;
    },
  });
  return query;
};
