import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { UserReviewForm, UserReview } from '@typings/review';
import { postNewReview, editReview } from '@services/review';
import useUserReviews from '@hooks/query/user/useUserReviews';
import {
  MAX_IMAGE_COUNT,
  MAX_TEXT_LENGTH,
  initialReviewState,
} from '@constants/review';
import useImageUploader from '@shared/hooks/ui/useImageUploader';
import useTextInput from '@shared/hooks/ui/useTextInput';

const useReviewModal = (
  onSuccess: () => void,
  reviewToEdit: UserReview | undefined,
) => {
  const isEditType = !!reviewToEdit;
  const [review, setReview] = useState<UserReviewForm>({
    ...initialReviewState,
  });
  const { images, newImages, removedImages, onAddImage, onRemoveImage } =
    useImageUploader(MAX_IMAGE_COUNT, reviewToEdit?.reviewImages);
  const { text, onInputChange } = useTextInput(
    MAX_TEXT_LENGTH,
    reviewToEdit?.content,
  );
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();
  const { refreshUserReviews } = useUserReviews(0, false);
  const isValidToSubmit = review.userRating && review.petFriendlyRating;

  const onChangeStarRates = useCallback(
    (key: 'userRating' | 'petFriendlyRating') => (value: number) => {
      setReview((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetReview = () => {
    setReview({
      ...initialReviewState,
    });
  };

  const handleWriteReview = async (reservationId: string) => {
    if (!isValidToSubmit) return;
    if (error) resetError();

    const data = { ...review } as any;

    data['reservationId'] = reservationId;

    if (text.trim().length > 0) data['content'] = text;

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    const formData = new FormData();

    formData.append('request', blob);
    if (newImages.length > 0) {
      newImages.forEach((img) => {
        formData.append('images', img);
      });
    }

    startIsLoading();
    try {
      await postNewReview(formData);
      resetReview();
      onSuccess();
      refreshUserReviews();
    } catch (error) {
      if (error instanceof AxiosError) {
        updateError(error.message);
      } else {
        updateError('에러가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      endIsLoading();
    }
  };

  const handleEditReview = async () => {
    if (!isValidToSubmit) return;
    if (error) resetError();

    const data = {
      userRating: review.userRating,
      petFriendlyRating: review.petFriendlyRating,
      deletedImageId: [...removedImages],
    } as any;

    if (text.trim().length > 0) data['content'] = text;

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    const formData = new FormData();

    formData.append('request', blob);

    if (newImages.length > 0) {
      newImages.map((img) => {
        formData.append('newImages', img);
      });
    }

    startIsLoading();
    try {
      await editReview(reviewToEdit?.reviewId!, formData);
      resetReview();
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        updateError(error.message);
      } else {
        updateError('에러가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      endIsLoading();
    }
  };

  const handleSubmit = (reservationId?: string) => {
    return isEditType ? handleEditReview() : handleWriteReview(reservationId!);
  };

  return {
    review,
    images,
    text,
    isValidToSubmit,
    isLoading,
    error,
    resetReview,
    handleSubmit,
    onChangeStarRates,
    onAddImage,
    onRemoveImage,
    onInputChange,
  };
};

export default useReviewModal;
