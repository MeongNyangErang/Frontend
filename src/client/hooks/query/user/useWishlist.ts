import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWishlist } from '@services/wishlist';

const useWishlist = (page: number, enabled?: boolean) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ['wishlist', page],
    queryFn: () => getWishlist(page),
    enabled: enabled !== undefined ? enabled : true,
    staleTime: 1000 * 60 * 60,
  });

  const refreshWishlist = () => {
    queryClient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        return Array.isArray(queryKey) && queryKey[0] === 'wishlist';
      },
    });
  };
  return { ...result, refreshWishlist };
};

export default useWishlist;
