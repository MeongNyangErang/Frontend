import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const socketUrl = `${BASE_URL}/ws`;

export const createStompClient = () => {
  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
  });

  return client;
};
