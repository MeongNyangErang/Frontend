import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReportList } from '@admin/services/adminReports';

const useReportList = (page: number, enabled: boolean = true) => {
  const result = useQuery({
    queryKey: ['report-list', page],
    queryFn: () => getReportList(page),
    staleTime: 1000 * 60 * 30,
    enabled,
  });

  const queryClient = useQueryClient();
  const refreshReportList = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['report-list'],
    });
  };

  return { ...result, refreshReportList };
};

export default useReportList;
