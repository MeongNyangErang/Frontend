import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotices } from '@admin/services/adminNotices';

const useNoticeList = (page: number, enabled: boolean = true) => {
  const result = useQuery({
    queryKey: ['notice-list', page],
    queryFn: () => getNotices(page),
    staleTime: 1000 * 60 * 60,
    enabled,
  });

  const queryClient = useQueryClient();
  const refreshNoticeList = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['notice-list'],
    });
  };

  return { ...result, refreshNoticeList };
};

export default useNoticeList;
