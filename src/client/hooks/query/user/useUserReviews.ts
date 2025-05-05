import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserReviews } from '@services/review';

const useUserReviews = (page: number, enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['user-reviews', page],
    queryFn: () => getUserReviews(page),
    staleTime: 1000 * 60 * 60,
    enabled,
  });

  const refreshUserReviews = async () => {
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        return Array.isArray(queryKey) && queryKey[0] === 'user-reviews';
      },
    });
  };

  return {
    ...result,
    refreshUserReviews,
  };
};

export default useUserReviews;
