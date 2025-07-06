import { useNavigate } from 'react-router-dom';
import { deleteReportedReview } from '@admin/services/adminReports';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import useReportList from '@admin/hooks/query/useReportList';
import ROUTES from '@admin/constants/routes';

const useReportDetailButtons = (reviewReportId: number) => {
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, resetError, updateError } = useError();
  const { refreshReportList } = useReportList(0, false);
  const navigate = useNavigate();

  const handleDeleteReview = async () => {
    startIsLoading();
    try {
      await deleteReportedReview(reviewReportId);
      await refreshReportList();
      navigate(ROUTES.reports.root(0));
    } catch (error) {
      console.log(error);
      updateError('리뷰 삭제에 실패했습니다.');
    } finally {
      endIsLoading();
    }
  };

  return { isLoading, error, resetError, handleDeleteReview };
};

export default useReportDetailButtons;
