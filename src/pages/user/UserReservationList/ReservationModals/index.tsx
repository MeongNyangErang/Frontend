import { memo } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Modal from '@components/common/Modal';
import { UserReservationItem } from '@typings/reservation';
import { formatDateStrToStrWithDay } from '@utils/date';
import StarRating from '@components/common/StarRating';
import { SReviewSummary, SRatingBox, SRatingTitle } from './styles';

interface ReservationModalsProps {
  reservationToReview: UserReservationItem | null;
}

const ReservationModals = ({ reservationToReview }: ReservationModalsProps) => {
  const {
    reservationId,
    accommodationName,
    roomName,
    checkInDate,
    checkOutDate,
  } = reservationToReview || {};

  return (
    <>
      <Modal isOpen={!!reservationToReview} variant="full" closeType="x">
        {reservationToReview && (
          <>
            <SReviewSummary>
              <div>{accommodationName}</div>
              <span>{roomName}</span>
              <p>
                <FaCalendarAlt />
                {formatDateStrToStrWithDay(checkInDate!)}
                <span>~</span>
                <FaCalendarAlt />
                {formatDateStrToStrWithDay(checkOutDate!)}
              </p>
            </SReviewSummary>
            <SRatingBox>
              <SRatingTitle>숙소는 만족하셨나요?</SRatingTitle>
              {/* <StarRating /> */}
            </SRatingBox>
          </>
        )}
      </Modal>
    </>
  );
};

export default memo(ReservationModals);
