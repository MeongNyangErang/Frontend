export interface ChatItem {
  chatRoomId: number;
  partnerId: number;
  partnerName: string;
  partnerImageUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageType: 'MESSAGE' | 'IMAGE';
  unreadCount: number;
}

interface ChatMessage {
  senderType: 'USER' | 'HOST';
  messageType: 'MESSAGE' | 'IMAGE';
  messageContent: string;
  createdAt: string;
}

export type PreviousChatMessage = ChatMessage & { chatRoomId: number };

export type NewChatMessage = ChatMessage & {
  partnerName: string;
  partnerImageUrl: string | null;
};

export interface ChatPartnerState {
  partnerName: string;
  partnerImageUrl: string | null;
  partnerId: number;
}
