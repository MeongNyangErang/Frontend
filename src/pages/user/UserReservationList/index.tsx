import { useState } from 'react';
import SubPageHeader from '@components/common/SubPageHeader';
import {
  RESERVATION_STATUS,
  RESERVATION_STATUS_MAP,
} from '@constants/reservation';
import { ReservationStatus } from '@typings/reservation';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import {
  STab,
  STabs,
  SReservationListWrap,
  SReservationList,
  SReservation,
  SEmptyMessage,
} from './styles';

const UserReservationList = () => {
  const [currentTab, setCurrentTab] = useState<ReservationStatus>(
    RESERVATION_STATUS[0],
  );
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(
    undefined,
  );
  const {
    data: { cursor, content: reservationList, hasNext } = {},
    error,
    isLoading,
  } = useUserReservationList(currentTab, currentCursor);
  return (
    <>
      {/* <SubPageHeader title="예약 내역" style='noButton'/> */}
      <STabs>
        {RESERVATION_STATUS.map((status) => {
          const name =
            RESERVATION_STATUS_MAP[
              status as keyof typeof RESERVATION_STATUS_MAP
            ];
          return (
            <STab
              key={status}
              className={currentTab === status ? 'is-active' : ''}
              onClick={() => setCurrentTab(status)}
            >
              {name}
            </STab>
          );
        })}
      </STabs>
      <SReservationListWrap>
        {!reservationList && (
          <SEmptyMessage>조회된 예약 내역이 없습니다.</SEmptyMessage>
        )}
        {reservationList && (
          <SReservationList>
            {reservationList.map(
              ({
                reservationDate,
                accommodationName,
                roomName,
                checkInDate,
                checkOutDate,
                checkInTime,
                checkOutTime,
                peopleCount,
                petCount,
                totalPrice,
              }) => {
                return <SReservation key={reservationDate}></SReservation>;
              },
            )}
          </SReservationList>
        )}
      </SReservationListWrap>
    </>
  );
};

export default UserReservationList;
