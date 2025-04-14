export interface ChatItem {
  chatRoomId: number;
  partnerId: number;
  partnerName: string;
  partnerImageUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
