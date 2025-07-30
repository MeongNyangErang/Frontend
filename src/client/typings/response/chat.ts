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
  chatMessagePage: {
    content: PreviousChatMessage[];
    first: boolean;
    last: boolean;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  partnerName: string;
  partnerImageUrl: null | string;
}

export interface CreateChatRoomResponse {
  chatRoomId: number;
}
