import { UserReservationListResponse } from '@typings/response/reservation';
import { fetchCall } from './api';
import { ReservationStatus } from '@typings/reservation';

export const getUserReservationList = async (
  status: ReservationStatus,
  cursor: number | undefined,
) => {
  const url = cursor
    ? `users/reservations?status=${status.toUpperCase()}&cursor=${cursor}`
    : `users/reservations?status=${status.toUpperCase()}`;
  return fetchCall<UserReservationListResponse>(url, 'get');
};

export const cancelReservation = async (reservationId: string) => {
  return await fetchCall(`users/reservations/${reservationId}/cancel`, 'patch');
};
