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
  messages: PreviousChatMessage[];
  nextCursorId: number;
  hasNext: boolean;
}
