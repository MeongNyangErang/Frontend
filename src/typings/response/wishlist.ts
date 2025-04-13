import { WishlistItem } from '@typings/wishlist';

export interface WishlistResponse {
  code: number;
  data: {
    content: WishlistItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}
