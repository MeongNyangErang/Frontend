import { UserReservationItem } from '@typings/reservation';

export interface UserReservationListResponse {
  code: number;
  content: UserReservationItem[];
  cursor: number;
  hasNext: boolean;
}
