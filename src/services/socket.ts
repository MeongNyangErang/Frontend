import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { getLocalStorage } from '@utils/storage';

const BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL;

const socketUrl = `${BASE_URL}/ws`;

export const createStompClient = () => {
  const token = getLocalStorage('accessToken');

  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return client;
};
