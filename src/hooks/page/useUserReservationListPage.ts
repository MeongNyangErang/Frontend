import { useCallback, useState, useEffect } from 'react';
import { ReservationStatus, UserReservationItem } from '@typings/reservation';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { RESERVATION_STATUS } from '@constants/reservation';

const useUserReservationListPage = () => {
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

  const refreshPage = () => {
    setReservationList([]);
    setCurrentCursor(undefined);
  };

  const handleSwitchTab = (tab: ReservationStatus) => {
    if (tab === currentTab) return;
    setCurrentTab(tab);
    refreshPage();
  };

  const onClickCancelButton = useCallback(
    (reservationId: string) => () => {
      setReservationToCancel(reservationId);
    },
    [],
  );

  const onClickReviewButton = useCallback(
    (reservation: UserReservationItem) => () => {
      setReservationToReview(reservation);
    },
    [],
  );

  const onCloseReviewModal = useCallback(() => {
    setReservationToReview(null);
  }, []);

  const onCloseCancelModal = useCallback(() => {
    setReservationToCancel(null);
  }, []);

  const onSuccessPostReview = useCallback(() => {
    refreshReservationList();
    refreshPage();
    onCloseReviewModal();
  }, []);

  const onSuccessCancelReservation = useCallback(() => {
    refreshReservationList();
    refreshPage();
    onCloseCancelModal();
  }, []);

  useEffect(() => {
    if (reservationItems) {
      setReservationList((prev) => [...prev, ...reservationItems]);
    }
  }, [reservationItems]);

  return {
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
  };
};

export default useUserReservationListPage;
