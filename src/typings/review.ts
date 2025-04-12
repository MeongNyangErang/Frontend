export interface UserReviewForm {
  userRating: number;
  petFriendlyRating: number;
  content?: string;
  images?: File[];
}

export interface UserReveiwImage {
  imageId: number;
  imageUrl: string;
}

export interface UserReview {
  reviewId: string;
  accommodationName: string;
  totalRating: number;
  content: string;
  reviewImages: UserReveiwImage[];
  createdAt: string;
}
