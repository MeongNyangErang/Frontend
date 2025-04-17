import { memo } from 'react';
import { ReservationStatus } from '@typings/reservation';
import Button from '@components/common/Button';

interface ReservationButtons {
  status: ReservationStatus;
  reviewWritten: boolean;
  chatLoading: boolean;
  chatError: string;
  onClickReview: () => void;
  onClickCancel: () => void;
  onClickChat: () => void;
}

const ReservationButtons = ({
  status,
  reviewWritten,
  chatLoading,
  chatError,
  onClickReview,
  onClickCancel,
  onClickChat,
}: ReservationButtons) => {
  if (status === 'CANCELED') return <span>취소완료</span>;
  if (status === 'COMPLETED')
    return (
      <Button
        variant="mainBorder"
        onClick={onClickReview}
        disabled={reviewWritten}
      >
        {reviewWritten ? '리뷰 작성 완료' : '리뷰 작성'}
      </Button>
    );
  return (
    <>
      <Button
        variant="grayBorder"
        onClick={onClickCancel}
        disabled={chatLoading || !!chatError}
        disabledStyle={false}
      >
        예약 취소
      </Button>
      <Button
        variant="mainBorder"
        onClick={onClickChat}
        disabled={chatLoading || !!chatError}
        disabledStyle={false}
      >
        호스트 문의
      </Button>
    </>
  );
};

export default memo(ReservationButtons);
