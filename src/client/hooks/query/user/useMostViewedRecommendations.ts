import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMostViewedRecommendations } from '@services/recommendations';
import { MostViewedRecommendationsResponse } from '@typings/response/recommendations';

const useMostViewedRecommendations = () => {
  const queryClient = useQueryClient();

  const refreshMostViewedRecommendations = (accommodationId: number) => {
    const prev = queryClient.getQueryData<MostViewedRecommendationsResponse>([
      'most-viewed-recommendations',
    ]);
    if (!prev) return;

    const newData = prev.map((v) =>
      v.id === accommodationId ? { ...v, wishlisted: !v.wishlisted } : v,
    );

    queryClient.setQueryData(['most-viewed-recommendations'], newData);
  };

  const result = useQuery({
    queryKey: ['most-viewed-recommendations'],
    queryFn: () => getMostViewedRecommendations(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    ...result,
    refreshMostViewedRecommendations,
  };
};

export default useMostViewedRecommendations;
