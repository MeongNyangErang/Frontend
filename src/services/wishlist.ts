import { WishlistResponse } from '@typings/response/wishlist';
import { fetchCall } from './api';

export const getWishlist = async (cursor?: number) => {
  const url = cursor
    ? `users/wishlist/accommodations?cursor=${cursor}`
    : 'users/wishlist/accommodations';
  return await fetchCall<WishlistResponse>(url, 'get');
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
