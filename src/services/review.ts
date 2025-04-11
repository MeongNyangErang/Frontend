import { UserReviewForm } from '@typings/review';
import { fetchCall } from './api';

export const postNewReview = async (
  review: UserReviewForm,
  reservationId: string,
) => {
  const data = { reservationId, ...review };
  return await fetchCall(`users/reviews`, 'post', data);
};
