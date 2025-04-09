import { UserReservationListResponse } from '@typings/response/reservation';
import { fetchCall } from './api';
import { ReservationStatus } from '@typings/reservation';

export const getUserReservationList = async (
  status: ReservationStatus,
  cursor: number | undefined,
) => {
  const url = cursor
    ? `users/reservations?status=${status}&cursor=${cursor}`
    : `users/reservations?status=${status}`;
  return fetchCall<UserReservationListResponse>(url, 'get');
};
