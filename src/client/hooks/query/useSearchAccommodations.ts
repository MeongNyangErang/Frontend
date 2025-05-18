import { SearchAccommodationsData } from '@typings/response/accommodations';
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { SearchBaseType, SearchFilterType } from '@typings/search';
import { searchAccommodations } from '@services/search';
export const useSearchAccommodations = (
  query: SearchBaseType,
  filter?: SearchFilterType,
) => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useInfiniteQuery({
    queryKey: ['search-accommodations', query, filter],
    queryFn: ({ pageParam = 0 }) =>
      searchAccommodations(query, pageParam, filter),
    enabled: Object.values(query).every((v) => v !== ''),
    staleTime: 1000 * 60 * 30,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.page + 1,
  });

  const toggleWishStatus = (accommodationId: number) => {
    queryClient.setQueryData<InfiniteData<SearchAccommodationsData>>(
      ['search-accommodations', query, filter],
      (prev) => {
        if (!prev) return prev;

        const newPages = prev.pages.map((page) => {
          const updatedContent = page.content.map((content) => {
            if (content.accommodationId === accommodationId) {
              return { ...content, wishlisted: !content.wishlisted };
            }
            return content;
          });

          return { ...page, content: updatedContent };
        });

        return { ...prev, pages: newPages };
      },
    );
  };

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

  const results = data?.pages.flatMap((page) => page.content) || [];
  const currentPage = data?.pages[0].page;
  const totalPages = data?.pages[0].totalPages;

  return {
    ...rest,
    results,
    currentPage,
    totalPages,
    refreshSearchAccommodations,
    toggleWishStatus,
  };
};
