import { UserReservationListResponse } from '@typings/response/reservation';
import { ReservationStatus } from '@typings/reservation';
import { fetchCall } from './apiClient';

export const getUserReservationList = async (
  status: ReservationStatus,
  page: number,
) => {
  return fetchCall<UserReservationListResponse>(
    `users/reservations?status=${status.toUpperCase()}&page=${page}`,
    'get',
  );
};

export const cancelReservation = async (reservationId: string) => {
  return await fetchCall(`users/reservations/${reservationId}/cancel`, 'patch');
};
