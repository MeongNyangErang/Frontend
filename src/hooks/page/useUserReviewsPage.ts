import { useState, useEffect, useCallback } from 'react';
import useUserReviews from '@hooks/query/user/useUserReviews';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { UserReview } from '@typings/review';

const useUserReviewsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [reviewToEdit, setReviewToEdit] = useState<null | UserReview>(null);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<null | string>(null);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

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
    refreshUserReviews();
    setReviews([]);
    setCurrentPage(0);
  };

  const onSuccessDeleteReview = useCallback(() => {
    handleSuccessReviewChange();
    onCloseDeleteModal();
  }, [handleSuccessReviewChange]);

  const onSuccessEditReview = useCallback(() => {
    handleSuccessReviewChange();
    onCloseEditModal();
  }, [handleSuccessReviewChange]);

  useEffect(() => {
    if (!content) return;
    setReviews((prev) => [...prev, ...content]);
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
