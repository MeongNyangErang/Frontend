import { UserReservationItem } from '@typings/reservation';

export interface UserReservationListResponse {
  code: number;
  content: UserReservationItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
