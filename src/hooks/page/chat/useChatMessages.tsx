import { useState, useEffect, useRef, useMemo } from 'react';
import { PreviousChatMessage, NewChatMessage } from '@typings/chat';
import usePreviousChatMessages from '@hooks/query/usePreviousChatMessages';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { PreviousChatMessagesResponse } from '@typings/response/chat';
import { sendChatImage } from '@services/chat';
import { createStompClient } from '@services/socket';

const useChatMessages = (chatRoomId: number | undefined) => {
  const stompClientRef = useRef(createStompClient());
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<PreviousChatMessage[]>([]);
  const [sendingError, setSendingError] = useState({ message: '', image: '' });
  const { data, isFetchingNextPage, hasNextPage, error, fetchNextPage } =
    usePreviousChatMessages(chatRoomId);
  const pages = (
    data as InfiniteData<PreviousChatMessagesResponse, number | null>
  )?.pages;
  const previousMessages = useMemo(
    () => pages?.flatMap((page) => page.messages),
    [data],
  );
  const enableToFetch = hasNextPage && !isFetchingNextPage && !error;
  const scrollRef = useInfiniteScroll(fetchNextPage, enableToFetch);

  const sendMessage = (content: string) => {
    const client = stompClientRef.current;

    if (!client || !client.connected) {
      setSendingError((prev) => ({
        ...prev,
        message: '메세지 전송에 실패했습니다.',
      }));
      return;
    }

    stompClientRef.current.publish({
      destination: `/app/chats/send/${chatRoomId}`,
      body: JSON.stringify({ content }),
    });
  };

  const sendImage = async (imageFile: File) => {
    if (!chatRoomId) return;
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    try {
      await sendChatImage(chatRoomId, formData);
    } catch (error) {
      setSendingError((prev) => ({
        ...prev,
        image: '이미지 전송에 실패했습니다.',
      }));
    }
  };

  useEffect(() => {
    if (previousMessages) {
      setMessages((prev) => {
        const set = new Set(prev.map((m) => m.created_at + m.content));
        const newMessages = previousMessages.filter(
          (m) => !set.has(m.created_at + m.content),
        );
        return [...newMessages, ...prev];
      });
    }
  }, [previousMessages]);

  useEffect(() => {
    if (!chatRoomId) return;

    const stompClient = stompClientRef.current;
    stompClient.onConnect = () => {
      setIsConnected(true);
      stompClient.subscribe(`subscribe/chats/${chatRoomId}`, (message) => {
        const { senderType, content, createdAt }: NewChatMessage = JSON.parse(
          message.body,
        );
        const newMessage = { senderType, content, created_at: createdAt };
        setMessages((prev) => [...prev, newMessage]);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      setIsConnected(false);
      setMessages([]);
    };
  }, [chatRoomId]);

  return {
    messages,
    isConnected,
    scrollRef,
    sendingError,
    sendMessage,
    sendImage,
  };
};

export default useChatMessages;
