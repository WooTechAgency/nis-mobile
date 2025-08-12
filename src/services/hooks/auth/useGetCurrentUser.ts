import { QUERY_KEY } from '@constants/keys.constants';
import { getCurrentUserApi } from '@services/authentication.service';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrentUser = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.CURRENT_USER],
    queryFn: () => getCurrentUserApi(),
  });
  return query;
};
