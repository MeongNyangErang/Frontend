import { useInfiniteQuery } from '@tanstack/react-query';
import { getPreviousChatMessages } from '@services/chat';
import { PreviousChatMessagesResponse } from '@typings/response/chat';

const usePreviousChatMessages = (
  chatRoomId: number | undefined,
): ReturnType<typeof useInfiniteQuery> => {
  return useInfiniteQuery<
    PreviousChatMessagesResponse,
    Error,
    PreviousChatMessagesResponse,
    (string | number | undefined)[],
    number | null
  >({
    queryKey: ['chat', 'previous-messages', chatRoomId],
    queryFn: ({ pageParam }) => {
      if (!chatRoomId) throw new Error('유효하지 않은 chatRoomId');
      return getPreviousChatMessages(chatRoomId, pageParam ?? 0);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return !lastPage.last ? lastPage.page : null;
    },
    enabled: !!chatRoomId,
  });
};

export default usePreviousChatMessages;
