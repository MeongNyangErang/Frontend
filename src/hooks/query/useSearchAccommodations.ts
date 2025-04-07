import { useQuery } from '@tanstack/react-query';
import { SearchQuery, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';

export const useSearchAccommodations = (
  query: SearchQuery,
  cursor: number | null,
  filter?: SearchFilterType,
) => {
  return useQuery({
    queryKey: ['searchAccommodations', query, cursor, filter],
    queryFn: () => searchAccommodations(query, cursor, filter),
    enabled: Object.values(query).every((v) => v !== ''),
    // staleTime:
  });
};
