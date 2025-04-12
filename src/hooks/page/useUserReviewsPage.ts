import { useState, useEffect, useCallback } from 'react';
import useUserReviews from '@hooks/query/user/userUserReviews';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { UserReview } from '@typings/review';

const useUserReviewsPage = () => {
  const [currentCursor, setCurrentCursor] = useState<undefined | number>(
    undefined,
  );
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [reviewToEdit, setReviewToEdit] = useState<null | UserReview>(null);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<null | string>(null);

  const {
    data: { content, cursor, hasNext } = {},
    isLoading,
    error,
    refreshUserReviews,
  } = useUserReviews(currentCursor);

  const updateCurrentCursor = useCallback(() => {
    setCurrentCursor(cursor);
  }, [cursor]);

  const observeTargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && !!hasNext,
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
    setCurrentCursor(undefined);
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

  return {
    reviews,
    reviewToEdit,
    reviewIdToDelete,
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
