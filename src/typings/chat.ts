export interface ChatItem {
  chatRoomId: number;
  partnerId: number;
  partnerName: string;
  partnerImageUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface PreviousChatMessage {
  messageId?: number;
  senderType: 'USER' | 'HOST';
  messageContent: string;
  createdAt: string;
  messageType: 'MESSAGE' | 'IMAGE';
}

export interface NewChatMessage {
  messageContent: string;
  senderType: 'USER' | 'HOST';
  messageType: 'MESSAGE' | 'IMAGE';
  createdAt: string;
}

export interface ChatPartnerState {
  partnerName: string;
  partnerImageUrl: string;
  partnerId: number;
}
