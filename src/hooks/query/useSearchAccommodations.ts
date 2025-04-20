import { useQuery } from '@tanstack/react-query';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';

export const useSearchAccommodations = (
  query: SearchBaseType,
  page: number,
  filter?: SearchFilterType,
) => {
  return useQuery({
    queryKey: ['search-accommodations', query, page, filter],
    queryFn: () => searchAccommodations(query, page, filter),
    enabled: Object.values(query).every((v) => v !== ''),
    staleTime: 1000 * 60 * 60,
  });
};
