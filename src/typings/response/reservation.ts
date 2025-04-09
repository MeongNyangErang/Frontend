export interface UserReservationItem {
  reservationDate: string;
  accommodationName: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  peopleCount: number;
  petCount: number;
  totalPrice: number;
}

export interface UserReservationListResponse {
  code: number;
  content: UserReservationItem[];
  cursor: number;
  hasNext: boolean;
}
