import { PetType } from '@typings/pet';
import { fetchCall } from './api';

export const getUserPetRecommendations = async () => {
  return await fetchCall('recommendations/user-pet', 'get');
};

export const getGuestRecommendations = async () => {
  return await fetchCall('recommendations/default', 'get');
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
