import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyPetList } from '@services/pet';

const useMyPetList = () => {
  const queryClicent = useQueryClient();
  const result = useQuery({
    queryKey: ['my-pet-list'],
    queryFn: getMyPetList,
    staleTime: 1000 * 5 * 60,
  });
  const invalidateMyPetList = () =>
    queryClicent.invalidateQueries({ queryKey: ['my-pet-list'] });

  return { ...result, invalidateMyPetList };
};

export default useMyPetList;
