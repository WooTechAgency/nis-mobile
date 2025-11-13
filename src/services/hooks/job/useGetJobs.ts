import { PER_PAGE } from '@constants/app.constants';
import { QUERY_KEY } from '@constants/keys.constants';
import { getJobsApi, GetJobsParams } from '@services/job.service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetJobs= (params?: GetJobsParams) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.JOBS,params],
    queryFn: async ({ pageParam }) => {
      return getJobsApi({
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
