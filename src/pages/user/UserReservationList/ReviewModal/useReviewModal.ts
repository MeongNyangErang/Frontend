import { useCallback, useState, useRef, ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';
import { UserReviewForm } from '@typings/review';
import { postNewReview } from '@services/review';
import {
  MAX_IMAGE_COUNT,
  MAX_TEXT_LENGTH,
  initialReviewState,
} from '@constants/review';

const useReviewModal = (onSuccess: () => void) => {
  const [review, setReveiw] = useState<UserReviewForm>({
    ...initialReviewState,
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isValidToSubmit = review.userRating && review.petFriendlyRating;

  const onChangeStarRates = useCallback(
    (key: 'userRating' | 'petFriendlyRating') => (value: number) => {
      setReveiw((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetReview = () => {
    setReveiw({
      ...initialReviewState,
    });
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value.slice(0, MAX_TEXT_LENGTH);
    setReveiw((prev) => ({ ...prev, content }));
  };

  const handleClickImageButton = () => {
    const target = imageInputRef.current;
    if (target) target.click();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (review.images && review.images.length === MAX_IMAGE_COUNT) return;
      const image = files[0];

      setReveiw((prev) => ({
        ...prev,
        images: [...(prev.images ? prev.images : []), image],
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImagePreviews((prev) => [...prev, url]);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleDeleteImage = (index: number) => {
    setReveiw((prev) => {
      const images = prev.images!.filter((_, i) => i !== index);
      return { ...prev, images };
    });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (reservationId: string) => {
    if (!isValidToSubmit) return;
    if (error) resetError();

    const data = { ...review };
    ['content', 'images'].forEach((key) => {
      const typedKey = key as keyof UserReviewForm;
      const value = data[typedKey];
      if (Array.isArray(value) && value.length === 0) {
        delete data[typedKey];
      }
      if (value === '') {
        delete data[typedKey];
      }
    });

    startIsLoading();
    try {
      await postNewReview(data, reservationId!);
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

  return {
    review,
    imagePreviews,
    imageInputRef,
    isValidToSubmit,
    isLoading,
    error,
    resetReview,
    handleChangeTextArea,
    handleChangeImage,
    handleClickImageButton,
    handleDeleteImage,
    handleSubmit,
    onChangeStarRates,
  };
};

export default useReviewModal;
