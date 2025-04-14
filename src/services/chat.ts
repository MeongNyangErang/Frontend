import { ChatListResponse } from '@typings/response/chat';
import { fetchCall } from './api';

export const getChatList = async (page: number) => {
  return await fetchCall<ChatListResponse>(`chats?page=${page}`, 'get');
};
