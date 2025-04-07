import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@services/auth';

const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 1000 * 60 * 30,
  });
};

export default useUserProfile;
