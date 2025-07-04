import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getNoticeList } from '@services/notices';

const useNoticeList = (enabled: boolean = true) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ['notice-list'],
    queryFn: ({ pageParam = 0 }) => getNoticeList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) return lastPage.page + 1;
      return undefined;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: 'always',
    enabled,
  });

  const queryClient = useQueryClient();

  const refreshNoticeList = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['notice-list'],
    });
  };

  const result = data?.pages.flatMap((page) => page.content) || [];

  return { ...rest, result, refreshNoticeList };
};

export default useNoticeList;
