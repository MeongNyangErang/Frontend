export interface UserReviewForm {
  userRating: number;
  petFriendlyRating: number;
  content?: string;
  images?: File[];
}
