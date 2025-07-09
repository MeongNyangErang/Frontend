import { UserReservationListResponse } from '@typings/response/reservation';
import { ReservationStatus } from '@typings/reservation';
import { ReservationInfo } from '@typings/payment';
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

const postPreCheckReservation = async (reservationData: ReservationInfo) => {
  return fetchCall('users/reservations/validate', 'post', reservationData);
};

const postConfirmReservation = (reservationData: ReservationInfo) => {
  return fetchCall('users/reservations/payment', 'post', reservationData);
};

export {
  getUserReservationList,
  cancelReservation,
  postPreCheckReservation,
  postConfirmReservation,
};
