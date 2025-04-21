import { UserReview } from '@typings/review';

export interface UserReviewsResponse {
  code: number;
  content: UserReview[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
