import { UserReview } from '@typings/review';

export interface UserReviewsResponse {
  code: number;
  content: UserReview[];
  cursor: number;
  hasNext: boolean;
}
