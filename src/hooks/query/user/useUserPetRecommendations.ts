import { useQuery } from '@tanstack/react-query';
import { getUserPetRecommendations } from '@services/recommendations';

const useUserPetRecommendations = () => {
  return useQuery({
    queryKey: ['user-pet-recommendations'],
    queryFn: () => getUserPetRecommendations(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useUserPetRecommendations;
