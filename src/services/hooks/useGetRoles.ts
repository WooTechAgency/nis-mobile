import { QUERY_KEY } from '@constants/keys.constants';
import { getRolesApi } from '@services/role.service';
import { useQuery } from '@tanstack/react-query';

export const useGetRoles = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.ROLES],
    queryFn: () => getRolesApi(),
    select: (data) => data.map((item ) =>{
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
  });
  return query;
};
