import { FaCalendarAlt } from 'react-icons/fa';
import { formatDateStrToKorean, formatDateStrToStrWithDay } from '@utils/date';
import { UserReservationItem, ReservationStatus } from '@typings/reservation';
import ReservationButtons from './ReservationButtons';
import {
  SReservation,
  SReservationBody,
  SReservationHeader,
  SReservationDate,
  SReservationDetail,
  SReservationButtonArea,
  SReservationPrice,
  SReservationButtons,
} from './styles';

interface ReservationItemProps {
  currentTab: ReservationStatus;
  reservation: UserReservationItem;
  chatLoading: boolean;
  chatError: string;
  onClickReviewButton: (reservatoin: UserReservationItem) => () => void;
  onClickCancelButton: (reservationId: string) => () => void;
  onClickChatButton: (accommodationId: number) => Promise<void>;
}

const ReservationItem = ({
  currentTab,
  reservation,
  onClickReviewButton,
  onClickCancelButton,
  onClickChatButton,
  ...rest
}: ReservationItemProps) => {
  const {
    reservationDate,
    accommodationName,
    roomName,
    checkInDate,
    checkOutDate,
    checkInTime,
    checkOutTime,
    totalPrice,
    reviewWritten,
    accommodationId,
  } = reservation;

  return (
    <SReservation>
      <SReservationHeader>
        <SReservationDate>
          <span>예약한 날짜</span>
          {formatDateStrToKorean(reservationDate)}
        </SReservationDate>
      </SReservationHeader>
      <SReservationBody>
        <SReservationDetail>
          <h3>{accommodationName}</h3>
          <p>{roomName}</p>
          <div>
            <FaCalendarAlt />
            {formatDateStrToStrWithDay(checkInDate)}
            <span>~</span>
            <FaCalendarAlt />
            {formatDateStrToStrWithDay(checkOutDate)}
          </div>
          <span>{`체크인:${checkInTime} / 체크아웃:${checkOutTime}`}</span>
        </SReservationDetail>
        <SReservationButtonArea>
          <SReservationPrice>
            <span>합계</span>
            {`${totalPrice.toLocaleString()}원`}
          </SReservationPrice>
          <SReservationButtons>
            <ReservationButtons
              status={currentTab}
              reviewWritten={reviewWritten}
              onClickReview={onClickReviewButton(reservation)}
              onClickCancel={onClickCancelButton(reservation.reservationId)}
              onClickChat={() => onClickChatButton(accommodationId)}
              {...rest}
            />
          </SReservationButtons>
        </SReservationButtonArea>
      </SReservationBody>
    </SReservation>
  );
};

export default ReservationItem;
