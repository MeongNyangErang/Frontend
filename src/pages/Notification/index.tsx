import React, { useEffect, useRef, useState } from 'react';

const Notificaion = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(' WebSocket 연결됨');
      socket.send(
        JSON.stringify({ action: 'subscribe', topic: 'notification' }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'notification') {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket 에러:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 종료됨');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>실시간 알림</h2>
      {messages.length === 0 ? (
        <p>알림 없음</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notificaion;
