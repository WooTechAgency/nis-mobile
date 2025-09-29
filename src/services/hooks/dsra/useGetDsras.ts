import { PER_PAGE } from '@constants/app.constants';
import { QUERY_KEY } from '@constants/keys.constants';
import { GetSwmsParams, getDsraApi } from '@services/dsra.service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGetDsras = (params?: GetSwmsParams) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.DSRAS, params],
    queryFn: async ({ pageParam }) => {
      return getDsraApi({
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
  })
  return query;
};


export const useGetDsrasToday= (params?: GetSwmsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DSRAS_TODAY, params],
    queryFn: () => getDsraApi(params),
    select: (data) => data.data.map((item) => {
      return {
        ...item,
        id: item.id,
        site_code: item.site.site_code,
        site_name: item.site.site_name,
        hazardsLength: item.hazards?.length,
        status: 'complete',
      }
    }),
  });
  return query;
};

