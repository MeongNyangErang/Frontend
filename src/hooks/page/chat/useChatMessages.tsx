import { useState, useEffect, useRef, useMemo } from 'react';
import { PreviousChatMessage, NewChatMessage } from '@typings/chat';
import usePreviousChatMessages from '@hooks/query/usePreviousChatMessages';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { PreviousChatMessagesResponse } from '@typings/response/chat';
import { sendChatImage } from '@services/chat';
import { createStompClient } from '@services/socket';
import { initialChatError } from '@constants/chat';

const useChatMessages = (chatRoomId: number | undefined) => {
  const stompClientRef = useRef<ReturnType<typeof createStompClient> | null>(
    null,
  );
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<PreviousChatMessage[]>([]);
  const [pendingMessage, setPendingMessage] = useState<null | string>(null);
  const [chatError, setChatError] = useState({ ...initialChatError });
  const { data, isFetchingNextPage, hasNextPage, error, fetchNextPage } =
    usePreviousChatMessages(chatRoomId);
  const pages = (
    data as InfiniteData<PreviousChatMessagesResponse, number | null>
  )?.pages;
  const previousMessages = useMemo(() => {
    const messages = pages?.flatMap((page) => page.content) || [];
    messages.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });

    return messages;
  }, [data]);

  const enableToFetch = hasNextPage && !isFetchingNextPage && !error;
  const infiniteScrollRef = useInfiniteScroll(fetchNextPage, enableToFetch);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInitialScrollRef = useRef(true);
  const pendingCallbackRef = useRef<{ onSuccess?: () => void } | null>(null);

  const resetError = () => {
    setChatError({ ...initialChatError });
  };

  const updateError = (key: keyof typeof initialChatError, text: string) => {
    setChatError((prev) => ({
      ...prev,
      [key]: text,
    }));
  };

  const updatePendingMessage = (message: string) => {
    setPendingMessage(message);
  };

  const sendMessage = (content: string, onSuccess: () => void) => {
    const client = stompClientRef.current;
    if (!client || !client.connected) {
      updateError('messageSending', '메세지 전송에 실패했습니다.');
      return;
    }

    stompClientRef.current!.publish({
      destination: `/app/chats/send/${chatRoomId}`,
      body: JSON.stringify({ content }),
    });

    updatePendingMessage(content);
    pendingCallbackRef.current = { onSuccess };
  };

  const sendImage = async (imageFile: File, onSuccess: () => void) => {
    if (!chatRoomId) return;

    const request = {
      chatRoomId,
    };

    const blob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });

    const formData = new FormData();
    formData.append('request', blob);
    formData.append('imageFile', imageFile);

    try {
      await sendChatImage(formData);
      onSuccess();
    } catch (error) {
      updateError('imageSending', '이미지 전송에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!pendingMessage) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.messageContent === pendingMessage) {
      pendingCallbackRef.current?.onSuccess?.();
    } else {
      updateError('messageSending', '메세지 전송에 실패했습니다.');
    }
    setPendingMessage(null);
    pendingCallbackRef.current = null;
  }, [messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const target = scrollContainerRef.current;
      if (
        target &&
        isInitialScrollRef.current &&
        previousMessages?.length > 0
      ) {
        isInitialScrollRef.current = false;
        target.scrollTop = target.scrollHeight;
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [previousMessages]);

  useEffect(() => {
    if (previousMessages && previousMessages.length > 0) {
      setMessages((prev) => {
        const set = new Set(prev.map((m) => m.createdAt + m.messageContent));
        const newMessages = previousMessages.filter(
          (m) => !set.has(m.createdAt + m.messageContent),
        );
        return [...prev, ...newMessages];
      });
    }
  }, [previousMessages]);

  useEffect(() => {
    if (!chatRoomId) return;

    let subscription: any;

    const stompClient = createStompClient();
    stompClientRef.current = stompClient;
    stompClient.onConnect = () => {
      setIsConnected(true);
      subscription = stompClient.subscribe(
        `/subscribe/chats/${chatRoomId}`,
        (message) => {
          const scrollTarget = scrollContainerRef.current;
          const wasAtBottom =
            scrollTarget &&
            scrollTarget.scrollTop + scrollTarget.clientHeight >=
              scrollTarget.scrollHeight - 10;
          const newMessage: NewChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);

          if (wasAtBottom)
            setTimeout(() => {
              scrollTarget.scrollTop = scrollTarget.scrollHeight;
            }, 0);
        },
      );
    };

    stompClient.onStompError = (frame) => {
      console.log('STOMP error', frame);
      updateError('stomp', '채팅 연결에 실패했습니다. 다시 시도해주세요.');
    };

    stompClient.onWebSocketError = (frame) => {
      console.log('WebSocket error', frame);
      updateError('socket', '채팅 연결에 실패했습니다. 다시 시도해주세요.');
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      subscription?.unsubscribe();
      setIsConnected(false);
      setMessages([]);
      resetError();
      isInitialScrollRef.current = true;
    };
  }, [chatRoomId]);

  return {
    messages,
    isConnected,
    chatError,
    infiniteScrollRef,
    scrollContainerRef,
    sendMessage,
    sendImage,
    updateError,
  };
};

export default useChatMessages;
