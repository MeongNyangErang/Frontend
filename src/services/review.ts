import { UserReviewEditForm, UserReviewForm } from '@typings/review';
import { UserReviewsResponse } from '@typings/response/review';
import { fetchCall } from './api';

export const postNewReview = async (review: FormData) => {
  return await fetchCall(`users/reviews`, 'post', review);
};

export const getUserReviews = async (cursor?: number) => {
  const url = cursor ? `users/reviews?cursor=${cursor}` : 'users/reviews';
  return await fetchCall<UserReviewsResponse>(url, 'get');
};

export const deleteReview = async (reviewId: string) => {
  return await fetchCall(`users/reviews/${reviewId}`, 'delete');
};

export const editReview = async (reviewId: string, editedReview: FormData) => {
  return await fetchCall(`users/reviews/${reviewId}`, 'put', editedReview);
};
