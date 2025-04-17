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
  content: string;
  created_at: string;
}

export interface NewChatMessage {
  chatRoomId: number;
  senderId: number;
  senderType: 'USER' | 'HOST';
  receiverId: number;
  receiverType: 'USER' | 'HOST';
  content: string;
  NotificationType: 'MESSAGE';
  createdAt: string;
}

export interface ChatPartnerState {
  partnerName: string;
  partnerImageUrl: string;
  partnerId: number;
}
