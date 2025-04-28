import { UserReservationListResponse } from '@typings/response/reservation';
import { fetchCall } from '@shared/services/api';
import { ReservationStatus } from '@typings/reservation';

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
