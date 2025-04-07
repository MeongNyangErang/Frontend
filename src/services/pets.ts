import { fetchCall } from './api';
import { MyPetListResponse } from '@typings/response/pets';

export const getMyPetList = async () => {
  return await fetchCall<MyPetListResponse>('users/pets', 'get');
};
