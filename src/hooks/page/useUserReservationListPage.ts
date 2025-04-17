import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationStatus, UserReservationItem } from '@typings/reservation';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { RESERVATION_STATUS } from '@constants/reservation';
import { createChatRoom } from '@services/chat';
import ROUTES from '@constants/routes';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';

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
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const {
    data: { cursor, content: reservationItems, hasNext = false } = {},
    error,
    isLoading,
    refreshReservationList,
  } = useUserReservationList(currentTab, currentCursor);

  const {
    isLoading: chatLoading,
    startIsLoading: startChatLoading,
    endIsLoading: endChatLoading,
  } = useIsLoading();

  const {
    error: chatError,
    resetError: resetChatError,
    updateError: updateChatError,
  } = useError();

  const updateCurrentCursor = useCallback(() => {
    if (!cursor) return;
    setCurrentCursor(cursor);
  }, [cursor, currentTab]);

  const infiniteScrolltargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && hasNext && isFirstLoaded,
  );

  const navigate = useNavigate();

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

  const onClickChatButton = useCallback(async (accommodationId: number) => {
    startChatLoading();
    try {
      const { chatRoomId } = await createChatRoom(accommodationId);
      navigate(ROUTES.chat.room(chatRoomId));
    } catch (error) {
      console.log(error);
      updateChatError(
        '호스트와의 대화방을 생성하는데 실패했습니다./n다시 시도해주세요.',
      );
    } finally {
      endChatLoading();
    }
  }, []);

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

  useEffect(() => {
    if (!isLoading && !isFirstLoaded) {
      setIsFirstLoaded(true);
    }
  }, [isLoading, isFirstLoaded]);

  return {
    currentTab,
    reservationList,
    reservationToReview,
    reservationToCancel,
    isFirstLoaded,
    infiniteScrolltargetRef,
    error,
    isLoading,
    chatLoading,
    chatError,
    resetChatError,
    handleSwitchTab,
    onClickReviewButton,
    onClickCancelButton,
    onClickChatButton,
    onCloseReviewModal,
    onCloseCancelModal,
    onSuccessPostReview,
    onSuccessCancelReservation,
  };
};

export default useUserReservationListPage;
