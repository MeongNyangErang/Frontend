export type ReservationStatus = 'reserved' | 'completed' | 'canceled';

export interface UserReservationItem {
  reservationId: string;
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
