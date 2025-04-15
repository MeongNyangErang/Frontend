import {
  ChatListResponse,
  PreviousChatMessagesResponse,
} from '@typings/response/chat';
import { fetchCall } from './api';

export const getChatList = async (page: number) => {
  return await fetchCall<ChatListResponse>(`chats?page=${page}`, 'get');
};

export const createChatRoom = async (accomodationId: number) => {
  return await fetchCall('chats/users/create', 'post', { accomodationId });
};

export const getPreviousChatMessages = async (
  chatRoomId: number,
  cursorId: number | null,
) => {
  return await fetchCall<PreviousChatMessagesResponse>(
    `chats/${chatRoomId}/messages?cursorId=${cursorId ?? ''}`,
    'get',
  );
};

export const sendChatImage = async (chatRoomId: number, formData: FormData) => {
  return await fetchCall(`chats/send/image/${chatRoomId}`, 'post', formData);
};
