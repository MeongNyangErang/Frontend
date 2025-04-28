export interface RecommendationsAccommodation {
  id: number;
  name: string;
  price: number;
  totalRating: number;
  thumbnailUrl: string;
  wishlisted: boolean;
}

export interface RecentReview {
  accommodationId: number;
  accommodationName: string;
  nickname: string;
  content: string;
  imageUrl: string;
  totalRating: number;
}
