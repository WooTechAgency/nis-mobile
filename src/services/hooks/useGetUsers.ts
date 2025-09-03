import { QUERY_KEY } from '@constants/keys.constants';
import { getUsersApi } from '@services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.USERS, ],
    queryFn: () => getUsersApi(),
    select(data) {
        return data.map((item)=> {
          return {...item, value: item.id, label: item.full_name}
        })
    },
  });
  return query;
};
