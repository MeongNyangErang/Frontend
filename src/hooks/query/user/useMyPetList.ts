import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyPetList } from '@services/pet';

const useMyPetList = () => {
  const queryClicent = useQueryClient();
  const result = useQuery({
    queryKey: ['my-pet-list'],
    queryFn: getMyPetList,
    staleTime: 1000 * 5 * 60,
  });
  const refreshMyPetList = () => {
    queryClicent.invalidateQueries({ queryKey: ['my-pet-list'] });
  };

  return { ...result, refreshMyPetList };
};

export default useMyPetList;
