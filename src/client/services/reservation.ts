import { UserReservationListResponse } from '@typings/response/reservation';
import { ReservationStatus } from '@typings/reservation';
import { fetchCall } from './apiClient';

const getUserReservationList = async (
  status: ReservationStatus,
  page: number,
) => {
  return fetchCall<UserReservationListResponse>(
    `users/reservations?status=${status.toUpperCase()}&page=${page}`,
    'get',
  );
};

const cancelReservation = async (reservationId: string) => {
  return fetchCall(`users/reservations/${reservationId}/cancel`, 'patch');
};

const postPreCheckReservation = async (reservationData: FormData) => {
  return fetchCall('reservations/validate', 'post', reservationData);
};

const postConfirmReservation = (reservationData: FormData) => {
  return fetchCall('reservations/payment', 'post', reservationData);
};

export {
  getUserReservationList,
  cancelReservation,
  postPreCheckReservation,
  postConfirmReservation,
};
