import { WishlistItem } from '@typings/wishlist';

export interface WishlistResponse {
  content: WishlistItem[];
  page: number;
  size: number;
  totatlElements: number;
  tatalPages: number;
  fisrt: boolean;
  last: boolean;
}
