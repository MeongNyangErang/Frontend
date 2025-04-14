import { WishlistItem } from '@typings/wishlist';

export interface WishlistResponse {
  content: WishlistItem[];
  nextCursor: number;
  hasNext: boolean;
}
