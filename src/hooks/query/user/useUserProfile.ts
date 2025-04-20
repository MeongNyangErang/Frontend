import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@services/auth';

const useUserProfile = () => {
  const result = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
    staleTime: 1000 * 60 * 30,
  });

  const queryClient = useQueryClient();
  const invalidateProfile = () =>
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });

  return { ...result, invalidateProfile };
};

export default useUserProfile;
