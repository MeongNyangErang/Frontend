import { useQuery } from '@tanstack/react-query';
import { getMostViewedRecommendations } from '@services/recommendations';

const useMostViewedRecommendations = () => {
  return useQuery({
    queryKey: ['most-viewed-recommendations'],
    queryFn: () => getMostViewedRecommendations(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useMostViewedRecommendations;
