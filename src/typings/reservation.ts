export type ReservationStatus = 'RESERVED' | 'COMPLETED' | 'CANCELED';

export interface UserReservationItem {
  reservationId: string;
  reservationDate: string;
  accommodationName: string;
  accommodationId: number;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  peopleCount: number;
  petCount: number;
  totalPrice: number;
  reviewWritten: boolean;
}
