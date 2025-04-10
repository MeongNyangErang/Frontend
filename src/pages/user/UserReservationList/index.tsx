import { useCallback, useState, useEffect, useRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import SubPageHeader from '@components/common/SubPageHeader';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import {
  RESERVATION_STATUS,
  RESERVATION_STATUS_MAP,
} from '@constants/reservation';
import { ReservationStatus, UserReservationItem } from '@typings/reservation';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { formatDateStrToKorean, formatDateStrToStrWithDay } from '@utils/date';
import ReservationModals from './ReservationModals';
import ReservationButtons from './ReservationButtons';
import {
  STab,
  STabs,
  STabIndicator,
  SReservationListWrap,
  SReservationList,
  SReservation,
  SReservationBody,
  SReservationHeader,
  SReservationDate,
  SReservationDetail,
  SReservationButtonArea,
  SReservationPrice,
  SReservationButtons,
  SListBottom,
} from './styles';

const UserReservationList = () => {
  const [currentTab, setCurrentTab] = useState<ReservationStatus>(
    RESERVATION_STATUS[0],
  );
  const [reservationList, setReservationList] = useState<UserReservationItem[]>(
    [],
  );
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(
    undefined,
  );
  const [reservationToReview, setReservationToReview] =
    useState<null | UserReservationItem>(null);
  const [reservationToCancel, setReservationToCancel] = useState<null | string>(
    null,
  );
  const tabRef = useRef<HTMLDivElement>(null);
  const [tabStyle, setTabStyle] = useState({ width: 0, left: 0 });
  const {
    data: { cursor, content: reservationItems, hasNext = false } = {},
    error,
    isLoading,
    refreshReservationList,
  } = useUserReservationList(currentTab, currentCursor);

  const updateCurrentCursor = useCallback(() => {
    if (!cursor) return;
    setCurrentCursor(cursor);
  }, [cursor, currentTab]);

  const infiniteScrolltargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && hasNext,
  );

  const handleSwitchTab = (tab: ReservationStatus) => {
    if (tab === currentTab) return;
    setCurrentTab(tab);
    setReservationList([]);
    setCurrentCursor(undefined);
  };

  const onClickReviewButton = useCallback(
    (reservation: UserReservationItem) => () => {
      setReservationToReview(reservation);
    },
    [],
  );

  useEffect(() => {
    if (!tabRef.current) return;
    const target = tabRef.current.querySelector('.is-active') as HTMLDivElement;
    if (target) {
      setTabStyle({ width: target.offsetWidth, left: target.offsetLeft });
    }
  }, [currentTab]);

  useEffect(() => {
    if (reservationItems) {
      setReservationList((prev) => [...prev, ...reservationItems]);
    }
  }, [reservationItems]);

  return (
    <>
      <SubPageHeader title="예약 내역" style="noButton" />
      <STabs ref={tabRef}>
        {RESERVATION_STATUS.map((status) => {
          const name =
            RESERVATION_STATUS_MAP[
              status as keyof typeof RESERVATION_STATUS_MAP
            ];
          return (
            <STab
              key={status}
              className={currentTab === status ? 'is-active' : ''}
              onClick={() => handleSwitchTab(status)}
            >
              {name}
            </STab>
          );
        })}
        <STabIndicator $width={tabStyle.width} $left={tabStyle.left} />
      </STabs>
      <SReservationListWrap>
        {error && (
          <MessageBox variant="light" fontSize={13}>
            {error.message}
          </MessageBox>
        )}
        {!error &&
          (reservationList.length === 0 ? (
            <MessageBox variant="white" fontSize={13}>
              조회된 예약 내역이 없습니다.
            </MessageBox>
          ) : (
            <SReservationList>
              {reservationList.map((reservation, index) => {
                const {
                  reservationId,
                  reservationDate,
                  accommodationName,
                  roomName,
                  checkInDate,
                  checkOutDate,
                  checkInTime,
                  checkOutTime,
                  totalPrice,
                } = reservation;
                return (
                  <SReservation key={index}>
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
                        <span>
                          {`체크인:${checkInTime} / 체크아웃:${checkOutTime}`}
                        </span>
                      </SReservationDetail>
                      <SReservationButtonArea>
                        <SReservationPrice>
                          <span>합계</span>
                          {`${totalPrice.toLocaleString()}원`}
                        </SReservationPrice>
                        <SReservationButtons>
                          <ReservationButtons
                            status={currentTab}
                            onClickReview={onClickReviewButton(reservation)}
                          />
                        </SReservationButtons>
                      </SReservationButtonArea>
                    </SReservationBody>
                  </SReservation>
                );
              })}
            </SReservationList>
          ))}
        <SListBottom ref={infiniteScrolltargetRef}>
          {isLoading && <Loader loading size={8} color="grayBorder" />}
        </SListBottom>
      </SReservationListWrap>
      <ReservationModals reservationToReview={reservationToReview} />
    </>
  );
};

export default UserReservationList;
