import { useQuery } from '@tanstack/react-query';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';

export const useSearchAccommodations = (
  query: SearchBaseType,
  cursor: number | null,
  filter?: SearchFilterType,
) => {
  return useQuery({
    queryKey: ['search-accommodations', query, cursor, filter],
    queryFn: () => searchAccommodations(query, cursor, filter),
    enabled: Object.values(query).every((v) => v !== ''),
    staleTime: 1000 * 60 * 60,
  });
};
