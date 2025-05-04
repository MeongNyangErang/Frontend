import { UserReviewsResponse } from '@typings/response/review';
import { fetchCall } from '@services/api';

export const postNewReview = async (review: FormData) => {
  return await fetchCall(`users/reviews`, 'post', review);
};

export const getUserReviews = async (page: number) => {
  return await fetchCall<UserReviewsResponse>(
    `users/reviews?page=${page}`,
    'get',
  );
};

export const deleteReview = async (reviewId: string) => {
  return await fetchCall(`users/reviews/${reviewId}`, 'delete');
};

export const editReview = async (reviewId: string, editedReview: FormData) => {
  return await fetchCall(`users/reviews/${reviewId}`, 'put', editedReview);
};

export const getAccommodationReviews = async (
  accommodationId: number,
  page: number,
) => {
  return await fetchCall(
    `accommodations/${accommodationId}/reviews?page=${page}`,
    'get',
  );
};
