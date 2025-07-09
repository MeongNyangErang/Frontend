import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserPetRecommendations } from '@services/recommendations';
import { UserPetRecommendationsResponse } from '@typings/response/recommendations';

const useUserPetRecommendations = (enabled: boolean = true) => {
  const QUERY_KEY = 'user-pet-recommendations' as const;

  const result = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getUserPetRecommendations(),
    staleTime: 1000 * 60 * 60,
    enabled,
  });

  const queryClient = useQueryClient();

  const refresehUserPetRecommendations = (accommodationId: number) => {
    const prev = queryClient.getQueryData<UserPetRecommendationsResponse>([
      QUERY_KEY,
    ]);
    if (!prev) return;
    const newData = prev.map((v) => {
      const hasAccommodation = v.recommendations.find(
        (r) => r.id === accommodationId,
      );
      if (hasAccommodation) {
        const newRecommendations = v.recommendations.map((r) => {
          if (r.id === accommodationId) {
            return { ...r, wishlisted: !r.wishlisted };
          } else {
            return r;
          }
        });
        return { ...v, recommendations: newRecommendations };
      }
      return v;
    });
    queryClient.setQueryData([QUERY_KEY], newData);
  };

  const invalidateUserPetRecommendations = async () => {
    await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  return {
    ...result,
    refresehUserPetRecommendations,
    invalidateUserPetRecommendations,
  };
};

export default useUserPetRecommendations;
