import { PetInfoList } from '@typings/pet';
import { fetchCall } from './api';
import { PetInfoState } from '@typings/pet';

export const getMyPetList = async () => {
  return await fetchCall<PetInfoList>('users/pets', 'get');
};

export const registerMyPet = async (petInfo: PetInfoState) => {
  return await fetchCall('users/pets', 'post', petInfo);
};

export const editMyPet = async (petInfo: PetInfoState, petId: number) => {
  return await fetchCall(`users/pets/${petId}`, 'put', petInfo);
};

export const deleteMyPet = async (petId: number) => {
  return await fetchCall(`users/pets/${petId}`, 'delete');
};
