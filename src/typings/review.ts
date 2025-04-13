export interface UserReviewForm {
  userRating: number;
  petFriendlyRating: number;
  content?: string;
  images?: File[];
}

export interface UserReviewEditForm {
  userRating: number;
  petFriendlyRating: number;
  content?: string;
  newImages?: File[];
  deletedImages?: number[];
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
