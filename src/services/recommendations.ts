import { PetType } from '@typings/pet';
import {
  UserPetRecommendationsResponse,
  GuestRecommendationsResponse,
  RecentReviewListResponse,
  MostViewedRecommendationsResponse,
} from '@typings/response/recommendations';
import { fetchCall } from './api';

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
  return await fetchCall(
    `recommendations/default/more?type=${type}&page=${page}`,
    'get',
  );
};
