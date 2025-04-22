import { useState, useEffect, useCallback } from 'react';
import useUserReviews from '@hooks/query/user/useUserReviews';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { UserReview } from '@typings/review';

const useUserReviewsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [reviewToEdit, setReviewToEdit] = useState<null | UserReview>(null);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<null | string>(null);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const { refreshReservationList } = useUserReservationList('CANCELED', 0);

  const {
    data: { content, last } = {},
    isLoading,
    error,
    refreshUserReviews,
  } = useUserReviews(currentPage);

  const updateCurrentCursor = useCallback(() => {
    if (last) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [last]);

  const observeTargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && !last && isFirstLoaded,
  );

  const handleClickDeleteButton = (reviewId: string) => {
    setReviewIdToDelete(reviewId);
  };

  const handleClickEditButton = (review: UserReview) => {
    setReviewToEdit(review);
  };

  const onCloseDeleteModal = useCallback(() => {
    setReviewIdToDelete(null);
  }, []);

  const onCloseEditModal = useCallback(() => {
    setReviewToEdit(null);
  }, []);

  const handleSuccessReviewChange = () => {
    setCurrentPage(0);
    refreshUserReviews();
  };

  const onSuccessDeleteReview = useCallback(() => {
    handleSuccessReviewChange();
    refreshReservationList('COMPLETED');
    onCloseDeleteModal();
  }, [handleSuccessReviewChange]);

  const onSuccessEditReview = useCallback(() => {
    handleSuccessReviewChange();
    onCloseEditModal();
  }, [handleSuccessReviewChange]);

  useEffect(() => {
    if (!content) return;
    if (currentPage === 0) {
      setReviews([...content]);
    } else {
      setReviews((prev) => [...prev, ...content]);
    }
  }, [content]);

  useEffect(() => {
    if (!isLoading && !isFirstLoaded) {
      setIsFirstLoaded(true);
    }
  }, [isLoading, isFirstLoaded]);

  return {
    reviews,
    reviewToEdit,
    reviewIdToDelete,
    isFirstLoaded,
    isLoading,
    error,
    observeTargetRef,
    updateCurrentCursor,
    handleClickDeleteButton,
    handleClickEditButton,
    onCloseDeleteModal,
    onCloseEditModal,
    handleSuccessReviewChange,
    onSuccessDeleteReview,
    onSuccessEditReview,
  };
};

export default useUserReviewsPage;
