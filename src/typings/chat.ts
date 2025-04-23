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

export interface PreviousChatMessage {
  messageId?: number;
  senderType: 'USER' | 'HOST';
  messageContent: string;
  createdAt: string;
  messageType: 'MESSAGE' | 'IMAGE';
  receiverName: string;
  receiverImageUrl: string;
}

export interface NewChatMessage {
  messageContent: string;
  senderType: 'USER' | 'HOST';
  messageType: 'MESSAGE' | 'IMAGE';
  createdAt: string;
}

export interface ChatPartnerState {
  partnerName: string;
  partnerImageUrl: string | null;
  partnerId: number;
}
