import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getHostSignupRequests } from '@admin/services/adminHostApproval';

const useHostSignupRequestList = (page: number, enabled: boolean = true) => {
  const result = useQuery({
    queryKey: ['host-signup-request-list'],
    queryFn: () => getHostSignupRequests(page),
    enabled,
  });

  const queryClient = useQueryClient();

  const refreshHostSignupRequestList = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['host-signup-request-list'],
    });
  };

  return { ...result, refreshHostSignupRequestList };
};

export default useHostSignupRequestList;
