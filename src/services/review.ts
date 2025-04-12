import { UserReviewEditForm, UserReviewForm } from '@typings/review';
import { UserReviewsResponse } from '@typings/response/review';
import { fetchCall } from './api';

export const postNewReview = async (
  review: UserReviewForm,
  reservationId: string,
) => {
  const data = { reservationId, ...review };
  return await fetchCall(`users/reviews`, 'post', data);
};

export const getUserReviews = async (cursor?: number) => {
  const url = cursor ? `users/reviews?cursor=${cursor}` : 'users/reviews';
  return await fetchCall<UserReviewsResponse>(url, 'get');
};

export const deleteReview = async (reviewId: string) => {
  return await fetchCall(`users/reviews/${reviewId}`, 'delete');
};

export const editReview = async (
  reviewId: string,
  editedReview: UserReviewEditForm,
) => {
  return await fetchCall(`users/reviews/${reviewId}`, 'put', editedReview);
};
