import { ChatItem } from '@typings/chat';

export interface ChatListResponse {
  content: ChatItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
