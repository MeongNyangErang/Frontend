import { getChatList } from '@services/chat';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ChatListResponse } from '@typings/response/chat';

const useChatList = (enabled = true) => {
  const queryClient = useQueryClient();

  const refreshChatList = async (chatRoomId: number) => {
    const prev = queryClient.getQueryData<{
      pages: ChatListResponse[];
      pageParams: number[];
    }>(['chat-list']);

    if (!prev) return;

    const targetPage = prev.pages.findIndex((page) =>
      page.content.some((content) => content.chatRoomId === chatRoomId),
    );

    if (targetPage === -1) return;

    try {
      const updatedPage = await getChatList(targetPage);
      const updatedPages = [...prev.pages];
      updatedPages[targetPage] = updatedPage;

      queryClient.setQueryData(['chat-list'], { ...prev, pages: updatedPages });
    } catch (error) {
      console.log(error);
    }
  };

  const result = useInfiniteQuery({
    queryKey: ['chat-list'],
    queryFn: ({ pageParam = 0 }) => getChatList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) return lastPage.page + 1;
      return undefined;
    },
    enabled,
  });

  return { refreshChatList, ...result };
};

export default useChatList;
