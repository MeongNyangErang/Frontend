import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/RegisterHeader';
import { AiOutlineNotification } from 'react-icons/ai';
import { fetchCall } from '@services/api';
import { getLocalStorage } from '@utils/storage';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export type NotificationType =
  | 'MESSAGE'
  | 'RESERVATION_CONFIRMED'
  | 'RESERVATION_REMINDER'
  | 'REVIEW';

interface Notification {
  notificationId: number;
  content: string;
  notificationType: NotificationType;
  createdAt: string;
}

interface NotificationResponse {
  content: Notification[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

const NotificationSender = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const token = getLocalStorage('accessToken');

  // 목록
  /*
  const fetchNotifications = async (page: number) => {
    try {
      (await fetchCall(
        `notifications?page=${page}&size=20`,
        'get',
      )) as NotificationResponse;
      setNotifications(response.content);
    } catch (error) {
      console.error('알림을 가져오는 중 오류 발생:', error);
    }
  };
  */

  // 구독
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`https://meongnyangerang.shop/?token=${token}`),

      onConnect: () => {
        console.log('WebSocket 연결됨');
        client.subscribe(`/user/subscribe/notifications`, (message: any) => {
          const newNotification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            newNotification,
          ]);
        });
      },

      onDisconnect: () => {
        console.log('WebSocket 연결 종료');
      },

      /*
      debug: (error: any) => {
        console.log(error);
      },
      */
    });

    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [token]);

  return (
    <div>
      <Header title="알림함" />
      <Container>
        <Title>
          <OutlineNotification />
          중요한 알림
        </Title>
        <NotificationList>
          {notifications.length === 0 ? (
            <NoNotificationsMessage>알림이 없습니다.</NoNotificationsMessage>
          ) : (
            notifications.map((notification) => (
              <NotificationItem key={notification.notificationId}>
                <Sender>{notification.notificationType}</Sender>
                <Content>{notification.content}</Content>
                <Timestamp>
                  {new Date(notification.createdAt).toLocaleString()}
                </Timestamp>
              </NotificationItem>
            ))
          )}
        </NotificationList>
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

const OutlineNotification = styled(AiOutlineNotification)`
  color: var(--main-color);
  margin-right: 5px;
  margin-top: 5px;
  font-size: 20px;
`;

const NoNotificationsMessage = styled.div`
  color: var(--gray-700);
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;
