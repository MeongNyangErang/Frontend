import { useQuery } from '@tanstack/react-query';
import { getHostProfile } from '@services/auth';

const useHostProfile = () => {
  return useQuery({
    queryKey: ['hostProfile'],
    queryFn: () => getHostProfile(),
    staleTime: 1000 * 60 * 30,
  });
};

export default useHostProfile;
