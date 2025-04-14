import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWishlist } from '@services/wishlist';

const useWishlist = (cursor: number | undefined) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ['wishlist', cursor],
    queryFn: () => getWishlist(cursor),
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
