import { useQuery } from '@tanstack/react-query';
import { getGuestRecommendations } from '@services/recommendations';

const useGuestRecommendations = () => {
  return useQuery({
    queryKey: ['guest-recommendations'],
    queryFn: () => getGuestRecommendations(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGuestRecommendations;
