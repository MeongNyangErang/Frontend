import { useState, useEffect, useRef } from 'react';
import SubPageHeader from '@components/common/SubPageHeader';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import {
  RESERVATION_STATUS,
  RESERVATION_STATUS_MAP,
} from '@constants/reservation';
import useUserReservationListPage from '@hooks/page/useUserReservationListPage';
import CancelModal from './CancelModal';
import ReviewModal from './ReviewModal';
import ReservationItem from './ReservationItem';
import {
  STab,
  STabs,
  STabIndicator,
  SReservationListWrap,
  SReservationList,
  SListBottom,
} from './styles';

const UserReservationList = () => {
  const tabRef = useRef<HTMLDivElement>(null);
  const [tabStyle, setTabStyle] = useState({ width: 0, left: 0 });
  const {
    currentTab,
    reservationList,
    reservationToReview,
    reservationToCancel,
    infiniteScrolltargetRef,
    error,
    isLoading,
    handleSwitchTab,
    onClickReviewButton,
    onClickCancelButton,
    onCloseReviewModal,
    onCloseCancelModal,
    onSuccessPostReview,
    onSuccessCancelReservation,
  } = useUserReservationListPage();

  useEffect(() => {
    if (!tabRef.current) return;
    const target = tabRef.current.querySelector('.is-active') as HTMLDivElement;
    if (target) {
      setTabStyle({ width: target.offsetWidth, left: target.offsetLeft });
    }
  }, [currentTab]);

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
              {reservationList.map((reservation) => {
                const { reservationId } = reservation;
                return (
                  <ReservationItem
                    key={reservationId}
                    currentTab={currentTab}
                    reservation={reservation}
                    onClickReviewButton={onClickReviewButton}
                    onClickCancelButton={onClickCancelButton}
                  />
                );
              })}
            </SReservationList>
          ))}
        <SListBottom ref={infiniteScrolltargetRef}>
          {isLoading && <Loader loading size={8} color="grayBorder" />}
        </SListBottom>
      </SReservationListWrap>
      <ReviewModal
        reservationToReview={reservationToReview}
        onClose={onCloseReviewModal}
        onSuccess={onSuccessPostReview}
      />
      <CancelModal
        reservationToCancel={reservationToCancel}
        onClose={onCloseCancelModal}
        onSuccess={onSuccessCancelReservation}
      />
    </>
  );
};

export default UserReservationList;
