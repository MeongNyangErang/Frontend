import { WishlistResponse } from '@typings/response/wishlist';
import { fetchCall } from './apiClient';

export const getWishlist = async (page: number) => {
  return await fetchCall<WishlistResponse>(
    `users/wishlist/accommodations?page=${page}`,
    'get',
  );
};

export const addToWishlist = async (accommodationId: number) => {
  return await fetchCall(
    `users/wishlist/accommodations/${accommodationId}`,
    'post',
  );
};

export const deleteFromWishlist = async (accommodationId: number) => {
  return await fetchCall(
    `users/wishlist/accommodations/${accommodationId}`,
    'delete',
  );
};
