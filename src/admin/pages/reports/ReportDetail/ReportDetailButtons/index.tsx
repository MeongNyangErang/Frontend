import Button from '@shared/components/common/Button';
import Modal from '@shared/components/common/Modal';
import useReportDetailButtons from './useReportDetailButtons';

interface ReportDetailButtonsProps {
  reviewReportId: number;
}

const ReportDetailButtons = ({ reviewReportId }: ReportDetailButtonsProps) => {
  const { isLoading, error, resetError, handleDeleteReview } =
    useReportDetailButtons(reviewReportId);

  return (
    <>
      <Button
        variant="grayBorder"
        fullWidth
        fixedHeight
        onClick={handleDeleteReview}
        disabled={isLoading}
      >
        리뷰 삭제
      </Button>
      <Modal
        variant="centered"
        isOpen={!!error}
        closeType="none"
        role="alert"
        onClose={resetError}
      >
        {error}
      </Modal>
    </>
  );
};

export default ReportDetailButtons;
