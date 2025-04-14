import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@services/auth';

const useUserProfile = () => {
  const result = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
    staleTime: 1000 * 60 * 30,
  });
  console.log(result.data, 'result');
  return result;
};

export default useUserProfile;
