import { QUERY_KEY } from '@constants/keys.constants';
import { getSitesApi } from '@services/site.service';
import { useQuery } from '@tanstack/react-query';

export const useGetSites = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SITES],
    queryFn: () => getSitesApi(),
    select: (data) => data.map((item ) =>{
      return {
        ...item,
        value: item.id,
        label: item.site_name,
        swms:{
          ...item.swms,
          value: item.swms.swms_id,
          label: item.swms.swms_name,
        }
      }
    })
  });
  return query;
};
