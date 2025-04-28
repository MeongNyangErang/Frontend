import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationStatus, UserReservationItem } from '@typings/reservation';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import useInfiniteScroll from '@shared/hooks/ui/useInfiniteScroll';
import { RESERVATION_STATUS } from '@constants/reservation';
import { createChatRoom } from '@services/chat';
import ROUTES from '@constants/routes';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';

const useUserReservationListPage = () => {
  const [currentTab, setCurrentTab] = useState<ReservationStatus>(
    RESERVATION_STATUS[0],
  );
  const [reservationList, setReservationList] = useState<UserReservationItem[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [reservationToReview, setReservationToReview] =
    useState<null | UserReservationItem>(null);
  const [reservationToCancel, setReservationToCancel] = useState<null | string>(
    null,
  );
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const {
    data: { page, content: reservationItems, last } = {},
    error,
    isLoading,
    refreshReservationList,
  } = useUserReservationList(currentTab, currentPage);

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

  const updateCurrentPage = useCallback(() => {
    if (last) return;
    setCurrentPage((prev) => prev + 1);
  }, [page, currentTab, last]);

  const infiniteScrolltargetRef = useInfiniteScroll(
    updateCurrentPage,
    !isLoading && !last && isFirstLoaded,
  );

  const navigate = useNavigate();

  const refreshPage = () => {
    if (currentPage === 0) return;
    setCurrentPage(0);
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
      console.log(chatRoomId, 'chatRoomId');
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
    refreshReservationList('COMPLETED');
    refreshPage();
    onCloseReviewModal();
  }, []);

  const onSuccessCancelReservation = useCallback(() => {
    refreshReservationList('RESERVED');
    refreshReservationList('CANCELED');
    refreshPage();
    onCloseCancelModal();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentTab]);

  useEffect(() => {
    if (!reservationItems) return;
    if (page === 0) {
      setReservationList([...reservationItems]);
    } else {
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
