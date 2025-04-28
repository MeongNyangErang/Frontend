import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserPetRecommendations } from '@services/recommendations';
import { UserPetRecommendationsResponse } from '@typings/response/recommendations';

const useUserPetRecommendations = () => {
  const result = useQuery({
    queryKey: ['user-pet-recommendations'],
    queryFn: () => getUserPetRecommendations(),
    staleTime: 1000 * 60 * 60,
  });

  const queryClient = useQueryClient();

  const refresehUserPetRecommendations = (accommodationId: number) => {
    const prev = queryClient.getQueryData<UserPetRecommendationsResponse>([
      'user-pet-recommendations',
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
    queryClient.setQueryData(['user-pet-recommendations'], newData);
  };

  return { ...result, refresehUserPetRecommendations };
};

export default useUserPetRecommendations;
