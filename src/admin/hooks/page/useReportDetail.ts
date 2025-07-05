import { useState, useEffect } from 'react';
import { ReportDetail } from '@admin/typings/adminReports';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { getReportDetail } from '@admin/services/adminReports';

const useReportDetail = (reportId: number) => {
  const [data, setData] = useState<ReportDetail | null>(null);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  useEffect(() => {
    const fetchReportDetail = async () => {
      startIsLoading();
      try {
        const res = await getReportDetail(reportId);
        setData(res);
      } catch (error) {
        console.log(error);
        updateError('데이터를 가져오는데 실패했습니다.');
      } finally {
        endIsLoading();
      }
    };

    fetchReportDetail();
  }, []);

  return { data, isLoading, error };
};

export default useReportDetail;
