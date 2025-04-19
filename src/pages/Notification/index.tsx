import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/RegisterHeader/index';
import { fetchCall } from '@services/api';
import { AiOutlineNotification } from 'react-icons/ai';
import axios from 'axios';

export type UserType = 'USER' | 'HOST';

export type NotificationType =
  | 'MESSAGE'
  | 'RESERVATION_CONFIRMED'
  | 'RESERVATION_REMINDER'
  | 'REVIEW';

interface NotificationPayload {
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

const NotificationSender = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: false,
  });

  useEffect(() => {
    socketRef.current = new WebSocket('wss://your-api-url/ws/notifications');

    socketRef.current.onopen = () => {
      console.log('[WebSocket] Connected');
      setLog((prev) => ['WebSocket 연결됨', ...prev]);
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('[WebSocket] Received:', message);
      setLog((prev) => [`수신: ${message.content}`, ...prev]);
    };

    socketRef.current.onclose = () => {
      console.log('[WebSocket] Closed');
      setLog((prev) => ['WebSocket 연결 종료', ...prev]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const loadNotifications = async (page: number = 0) => {
    try {
      const notificationsList = await fetchCall<{
        data: NotificationPayload[];
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        first: boolean;
        last: boolean;
      }>(`/notifications/list?page=${page}&size=${pagination.size}`, 'get');

      if (!Array.isArray(notificationsList.data)) {
        throw new Error('Response data is not an array');
      }

      setNotifications((prev) => [...prev, ...notificationsList.data]);
      setPagination({
        page: notificationsList.page,
        size: notificationsList.size,
        totalElements: notificationsList.totalElements,
        totalPages: notificationsList.totalPages,
        first: notificationsList.first,
        last: notificationsList.last,
      });
    } catch (e: any) {
      setLog((prev) => [`알림 목록 로드 실패: ${e.message}`, ...prev]);
    }
  };

  useEffect(() => {
    loadNotifications(0);
  }, [pagination.size]);

  const loadMore = () => {
    if (pagination.page < pagination.totalPages - 1) {
      loadNotifications(pagination.page + 1);
    }
  };

  const handleSend = async () => {
    try {
      await axios('/user/subscribe/notifications');
      setLog((prev) => ['구독 완료', ...prev]);

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

      const request = {
        chatRoomId: 1,
        content: '알림입니다',
      };
      await fetchCall('/notifications/messages', 'post', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      setLog((prev) => [`전송`, ...prev]);
    } catch (e: any) {
      setLog((prev) => [`실패`, ...prev]);
    }
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
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationItem key={index}>
                <Sender>
                  {notification.senderType === 'HOST' ? '호스트' : '사용자'}
                </Sender>
                <Content>{notification.content}</Content>
                <Timestamp>
                  {new Date(notification.createdAt).toLocaleString()}
                </Timestamp>
              </NotificationItem>
            ))
          ) : (
            <NotificationItem>현재 알림이 없습니다.</NotificationItem>
          )}
        </NotificationList>

        {pagination.page < pagination.totalPages - 1 && (
          <LoadMoreButton onClick={loadMore}>더 보기</LoadMoreButton>
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
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 20px 0;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #3578b6;
  }
`;

const OutlineNotification = styled(AiOutlineNotification)`
  color: var(--main-color);
  margin-right: 5px;
  margin-top: 5px;
  font-size: 20px;
`;
