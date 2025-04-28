import {
  RecentReview,
  RecommendationsAccommodation,
} from '@typings/recommendations';

export type UserPetRecommendationsResponse = {
  petId: number;
  petName: string;
  recommendations: RecommendationsAccommodation[];
}[];

export interface GuestRecommendationsResponse {
  소형견: RecommendationsAccommodation[];
  중형견: RecommendationsAccommodation[];
  대형견: RecommendationsAccommodation[];
  고양이: RecommendationsAccommodation[];
}

export type MostViewedRecommendationsResponse = RecommendationsAccommodation[];

export type RecentReviewListResponse = RecentReview[];

export interface UserPetMoreRecommendationsResponse {
  code: number;
  content: RecommendationsAccommodation[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface GuestMoreRecommendationsResponse {
  code: number;
  content: RecommendationsAccommodation[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
