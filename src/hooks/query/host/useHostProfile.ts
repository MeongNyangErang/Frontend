import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getHostProfile } from '@services/auth';

const useHostProfile = () => {
  const result = useQuery({
    queryKey: ['hostProfile'],
    queryFn: () => getHostProfile(),
    staleTime: 1000 * 60 * 30,
  });

  const queryClient = useQueryClient();
  const invalidateProfile = () =>
    queryClient.invalidateQueries({ queryKey: ['hostProfile'] });

  return { ...result, invalidateProfile };
};

export default useHostProfile;
