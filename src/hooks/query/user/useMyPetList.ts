import { useQuery } from '@tanstack/react-query';
import { getMyPetList } from '@services/pet';

const useMyPetList = () => {
  return useQuery({
    queryKey: ['my-pet-list'],
    queryFn: getMyPetList,
    staleTime: 1000 * 5 * 60,
  });
};

export default useMyPetList;
