import { getChatList } from '@services/chat';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const useChatList = () => {
  const queryCient = useQueryClient();
  const refreshChatList = () => {
    queryCient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;

        return Array.isArray(queryKey) && queryKey[0] === '';
      },
    });
  };

  const result = useInfiniteQuery({
    queryKey: ['chat-list'],
    queryFn: ({ pageParam = 0 }) => getChatList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) return lastPage.page + 1;

      return undefined;
    },
  });

  return { refreshChatList, ...result };
};

export default useChatList;
