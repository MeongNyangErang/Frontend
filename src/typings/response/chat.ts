import { ChatItem, PreviousChatMessage } from '@typings/chat';

export interface ChatListResponse {
  content: ChatItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface PreviousChatMessagesResponse {
  code: number;
  data: PreviousChatMessage[];
  page: number;
  size: number;
  totalElement: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface CreateChatRoomResponse {
  chatRoomId: number;
}
