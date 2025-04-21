import {
  RecentReview,
  RecommendationsAccommodation,
} from '@typings/recommendations';

export type UserPetRecommendationsResponse = {
  petId: number;
  petName: string;
  recommedations: RecommendationsAccommodation[];
}[];

export interface GuestRecommendationsResponse {
  소형견: RecommendationsAccommodation[];
  중형견: RecommendationsAccommodation[];
  대형견: RecommendationsAccommodation[];
  고양이: RecommendationsAccommodation[];
}

export interface MostViewedRecommendationsResponse {
  code: number;
  data: RecommendationsAccommodation[];
}

export interface RecentReviewListResponse {
  code: number;
  data: RecentReview[];
}
