import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ReservationStatus } from '@typings/reservation';
import { getUserReservationList } from '@services/reservation';

const useUserReservationList = (
  status: ReservationStatus,
  cursor: number | undefined,
) => {
  const queryClient = useQueryClient();
  const refreshReservationList = async () => {
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        return (
          Array.isArray(queryKey) &&
          queryKey[0] === 'user-reservation-list' &&
          queryKey[1] === 'reserved'
        );
      },
    });
    await queryClient.refetchQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        return (
          Array.isArray(queryKey) &&
          queryKey[0] === 'user-reservation-list' &&
          queryKey[1] === 'reserved'
        );
      },
    });
  };

  const result = useQuery({
    queryKey: ['user-reservation-list', status, cursor],
    queryFn: () => getUserReservationList(status, cursor),
    staleTime: 1000 * 60 * 5,
  });

  return { ...result, refreshReservationList };
};

export default useUserReservationList;
