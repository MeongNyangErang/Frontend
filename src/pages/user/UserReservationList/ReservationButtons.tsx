import { memo } from 'react';
import { ReservationStatus } from '@typings/reservation';
import Button from '@components/common/Button';

interface ReservationButtons {
  status: ReservationStatus;
  onClickReview: () => void;
}

const ReservationButtons = ({ status, onClickReview }: ReservationButtons) => {
  if (status === 'canceled') return <span>취소완료</span>;
  if (status === 'completed')
    return (
      <Button variant="mainBorder" fontSize="14px" onClick={onClickReview}>
        리뷰 작성
      </Button>
    );
  return (
    <>
      <Button variant="grayBorder" fontSize="14px" onClick={() => {}}>
        예약 취소
      </Button>
      <Button variant="mainBorder" fontSize="14px" onClick={() => {}}>
        호스트 문의
      </Button>
    </>
  );
};

export default memo(ReservationButtons);
