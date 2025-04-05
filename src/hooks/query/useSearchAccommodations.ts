import { useQuery } from '@tanstack/react-query';
import { SearchQuery, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';

export const useSearchAccommodations = (
  query: SearchQuery,
  filter?: SearchFilterType,
) => {
  return useQuery({
    queryKey: ['searchAccommodations', query, filter],
    queryFn: () => searchAccommodations(query, filter),
    enabled: Object.values(query).every((v) => v !== ''),
    // staleTime:
  });
};
