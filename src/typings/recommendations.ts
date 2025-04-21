export interface RecommendationsAccommodation {
  id: number;
  name: string;
  price: number;
  totalRating: number;
  thumbnailUrl: string;
}

export interface RecentReview {
  accommodationId: number;
  accommodationName: string;
  nickname: string;
  content: string;
  imagesUrl: string;
  totalRating: number;
}
