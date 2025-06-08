import { PetType } from '@typings/pet';
import {
  UserPetRecommendationsResponse,
  GuestRecommendationsResponse,
  RecentReviewListResponse,
  MostViewedRecommendationsResponse,
  UserPetMoreRecommendationsResponse,
  GuestMoreRecommendationsResponse,
} from '@typings/response/recommendations';
import { fetchCall } from './apiClient';

export const getUserPetRecommendations = async () => {
  return await fetchCall<UserPetRecommendationsResponse>(
    'recommendations/user-pet',
    'get',
  );
};

export const getGuestRecommendations = async () => {
  return await fetchCall<GuestRecommendationsResponse>(
    'recommendations/default',
    'get',
  );
};

export const getRecentReviewList = async () => {
  return await fetchCall<RecentReviewListResponse>(
    'users/latest-reviews',
    'get',
  );
};

export const getMostViewedRecommendations = async () => {
  return await fetchCall<MostViewedRecommendationsResponse>(
    'recommendations/most-viewed',
    'get',
  );
};

export const getMoreGuestRecommendations = async (
  type: PetType,
  page: number,
) => {
  return await fetchCall<GuestMoreRecommendationsResponse>(
    `recommendations/default/more?type=${type}&page=${page}`,
    'get',
  );
};

export const getMoreUserRecommendations = async (
  petId: number,
  page: number,
) => {
  return await fetchCall<UserPetMoreRecommendationsResponse>(
    `recommendations/user-pet/more?petId=${petId}&page=${page}`,
    'get',
  );
};
