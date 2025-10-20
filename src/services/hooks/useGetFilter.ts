import { QUERY_KEY } from '@constants/keys.constants';
import { getDsraFilterOptionsApi, getIncidentsFilterOptionsApi, GetIncidentsFilterOptionsParams, getUserFilterOptionsApi, GetUserFilterOptionsParams } from '@services/fiter.service';
import { useQuery } from '@tanstack/react-query';

export function useGetUserFilterOptions(params?: GetUserFilterOptionsParams) {
  const query = useQuery({
    queryKey: [QUERY_KEY.USER_FILTER_OPTIONS],
    queryFn: () => getUserFilterOptionsApi(params),
    select(data) {
      return data.map((item)=> {
        return {...item, selected: false, label: item.name, value: item.id }
      })
    }
  });
  return query;
};

export function useGetIncidentsFilterOptions(params?: GetIncidentsFilterOptionsParams) {
  const query = useQuery({
    queryKey: [QUERY_KEY.INCIDENTS_FILTER_OPTIONS, params],
    queryFn: () => getIncidentsFilterOptionsApi(params),
    select(data) {
      return {
        sites: data.sites.map((item)=> {
          return {...item, selected: false, label: item.name, value: item.id }
        }),
        incident_types: data.incident_types.map((item)=> {
          return {...item, selected: false, label: item.name, value: item.id }
        })
      }
    }
    });
  return query;
};

export function useGetDsraFilterOptions() {
  const query = useQuery({
    queryKey: [QUERY_KEY.DSRAS_FILTER_OPTIONS],
    queryFn: () => getDsraFilterOptionsApi(),
  });
  return query;
};
