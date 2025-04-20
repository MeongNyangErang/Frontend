import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '@components/common/RegisterHeader';
import { AiOutlineNotification } from 'react-icons/ai';
import axios from 'axios';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export type UserType = 'USER' | 'HOST';

export type NotificationType =
  | 'MESSAGE'
  | 'RESERVATION_CONFIRMED'
  | 'RESERVATION_REMINDER'
  | 'REVIEW';

interface NotificationPayload {
  notificationId: number;
  chatRoomId: number;
  senderId: number;
  senderType: UserType;
  receiverId: number;
  receiverType: UserType;
  content: string;
  notificationType: NotificationType;
  createdAt: string;
}

interface SendNotificationRequest {
  chatRoomId: number;
  senderId: number;
  senderType: UserType;
  receiverId: number;
  receiverType: UserType;
  content: string;
  notificationType: NotificationType;
  createdAt?: string;
}

// 목록
const fetchNotifications = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`/notifications?page=${pageParam}&size=10`);
  return {
    notifications: data.data,
    nextPage: data.last ? undefined : pageParam + 1,
  };
};

// 전송
const sendNotification = async (payload: SendNotificationRequest) => {
  await axios.post('/notifications/messages', {
    chatRoomId: payload.chatRoomId,
    content: payload.content,
  });
};

const NotificationSender = () => {
  const socket = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  // 구독
  useEffect(() => {
    socket.current = new WebSocket(
      'ws://localhost:8080//user/subscribe/notifications',
    );

    socket.current.addEventListener('open', () => {
      console.log('WebSocket 연결됨');
    });

    socket.current.addEventListener('message', (event) => {
      console.log('알림 수신:', event);
    });

    socket.current.addEventListener('close', () => {
      console.log('WebSocket 연결 종료');
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const { mutate: send, isPending: isSending } = useMutation({
    mutationFn: sendNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleSend = () => {
    const payload: SendNotificationRequest = {
      chatRoomId: 1,
      senderId: 100,
      senderType: 'HOST',
      receiverId: 200,
      receiverType: 'USER',
      content: '알림입니다',
      notificationType: 'MESSAGE',
      createdAt: new Date().toISOString(),
    };
    send(payload);
  };

  return (
    <div>
      <Header title="알림함" />
      <Container>
        <Title>
          <OutlineNotification />
          중요한 알림
        </Title>
        <NotificationList>
          {data?.pages?.length &&
          data.pages.some((page) => page?.notifications?.length > 0) ? (
            data.pages.flatMap((page) =>
              page.notifications.map((notification: NotificationPayload) => (
                <NotificationItem key={notification.notificationId}>
                  <Sender>
                    {notification.senderType === 'HOST' ? '호스트' : '사용자'}
                  </Sender>
                  <Sender>{notification.notificationType}</Sender>
                  <Content>{notification.content}</Content>
                  <Timestamp>
                    {new Date(notification.createdAt).toLocaleString()}
                  </Timestamp>
                </NotificationItem>
              )),
            )
          ) : (
            <NotificationItem>현재 알림이 없습니다.</NotificationItem>
          )}
        </NotificationList>

        {hasNextPage && (
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '로딩 중...' : '더 보기'}
          </LoadMoreButton>
        )}
      </Container>
    </div>
  );
};
export default NotificationSender;

const Container = styled.div`
  font-family: 'Noto Sans KR';
  margin: 20px auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
  padding: 16px;
  border-top: 1px solid #f5f5f5;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--gray-700);
  font-weight: bold;
  padding-left: 10px;
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  background: #fff;
  border-radius: 8px;
  padding: 7px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Sender = styled.span`
  font-weight: 600;
  color: #4a90e2;
`;

const Content = styled.span`
  display: block;
  margin-top: 0.3rem;
  color: #333;
`;

const Timestamp = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.5rem;
  text-align: right;
`;

const LoadMoreButton = styled.button`
  color: var(--gray-700);
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 20px 0;
  text-align: center;
  width: 100%;
`;

const OutlineNotification = styled(AiOutlineNotification)`
  color: var(--main-color);
  margin-right: 5px;
  margin-top: 5px;
  font-size: 20px;
`;
