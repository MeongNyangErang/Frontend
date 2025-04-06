import { useQuery } from '@tanstack/react-query';
import { SearchQuery, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';

export const useSearchAccommodations = (
  query: SearchQuery,
  filter?: SearchFilterType,
  cursor?: string,
) => {
  return useQuery({
    queryKey: ['searchAccommodations', query, filter, cursor],
    queryFn: () => searchAccommodations(query, filter, cursor),
    enabled: Object.values(query).every((v) => v !== ''),
    // staleTime:
  });
};
