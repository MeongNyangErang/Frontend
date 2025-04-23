import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/RegisterHeader';
import { AiOutlineNotification } from 'react-icons/ai';
import { fetchCall } from '@services/api';
import { getLocalStorage } from '@utils/storage';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { GoX } from 'react-icons/go';

type NotificationType =
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

const notificationTypeMap: Record<NotificationType, string> = {
  MESSAGE: '메시지가 도착했습니다.',
  RESERVATION_CONFIRMED: '예약이 확정되었습니다.',
  RESERVATION_REMINDER: '예약 알림이 도착했습니다.',
  REVIEW: '리뷰를 남겨주세요',
};

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
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const size = 20;

  // 목록
  const fetchNotifications = async () => {
    let currentPage = 0;
    let allNotifications: Notification[] = [];
    let lastPage = false;

    try {
      while (!lastPage) {
        const response = (await fetchCall(
          `/notifications?page=${page}&size=20`,
          'get',
        )) as NotificationResponse;

        if (Array.isArray(response?.content)) {
          allNotifications = [...allNotifications, ...response.content];
          lastPage = response.last;
          currentPage += 1;
        } else {
          console.error('알림 응답이 배열이 아닙니다', response);
          break;
        }
      }
      setNotifications(
        allNotifications.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
      setPage(currentPage - 1);
      setLastPage(true);
    } catch (error) {
      console.error('알림을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  // 구독
  useEffect(() => {
    const token = getLocalStorage('accessToken');
    const client = new Client({
      webSocketFactory: () => new SockJS('https://meongnyangerang.shop/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        console.log('WebSocket 연결됨');
        client.subscribe('/user/subscribe/notifications', (message: any) => {
          const { notificationId, content, notificationType, createdAt } =
            JSON.parse(message.body);
          console.log(message, message.body, 'message here');
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { notificationId, content, notificationType, createdAt },
          ]);
        });
      },

      onDisconnect: () => {
        console.log('WebSocket 연결 종료');
      },
    });

    client.onStompError = (frame) => {
      console.log('STOMP error', frame);
    };

    client.onWebSocketError = (frame) => {
      console.log('WebSocket error', frame);
    };

    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  });

  // 삭제
  const deleteNotification = async (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.notificationId !== notificationId,
      ),
    );

    try {
      await fetchCall(`/notifications/${notificationId}`, 'delete');
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
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
          {notifications.length === 0 ? (
            <NoNotificationsMessage>알림이 없습니다.</NoNotificationsMessage>
          ) : (
            notifications.map((notification) => (
              <NotificationItem key={notification.notificationId}>
                <All>
                  <Sender>
                    {notificationTypeMap[notification.notificationType]}
                  </Sender>
                  <DeleteButton
                    onClick={() =>
                      deleteNotification(notification.notificationId)
                    }
                  >
                    <X />
                  </DeleteButton>
                </All>
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
  padding: 16px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

const Sender = styled.span`
  font-weight: bold;
  color: #3a86ff;
`;

const Content = styled.span`
  display: block;
  margin-top: 5px;
  color: var(--gray-700);
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: var(--gray-600);
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const All = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const X = styled(GoX)`
  color: var(--gray-500);
  font-size: 18px;
`;
