import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';

export const useSearchAccommodations = (
  query: SearchBaseType,
  page: number,
  filter?: SearchFilterType,
) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ['search-accommodations', query, page, filter],
    queryFn: () => searchAccommodations(query, page, filter),
    enabled: Object.values(query).every((v) => v !== ''),
    staleTime: 1000 * 60 * 30,
  });
  const refreshSearchAccommodations = () => {
    queryClient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        return (
          Array.isArray(queryKey) && queryKey[0] === 'search-accommodations'
        );
      },
    });
  };

  return { ...result, refreshSearchAccommodations };
};
