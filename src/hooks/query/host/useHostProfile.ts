import { useQuery } from '@tanstack/react-query';
import { getHostProfile } from '@services/auth';

const useHostProfile = (hostId: string) => {
  return useQuery({
    queryKey: ['hostProfile', hostId],
    queryFn: () => getHostProfile(hostId),
    staleTime: 1000 * 60 * 30,
  });
};

export default useHostProfile;
