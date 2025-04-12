import { useCallback, useState, useRef, ChangeEvent, useEffect } from 'react';
import { AxiosError } from 'axios';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';
import {
  UserReviewForm,
  UserReview,
  UserReviewEditForm,
} from '@typings/review';
import { postNewReview, editReview } from '@services/review';
import {
  MAX_IMAGE_COUNT,
  MAX_TEXT_LENGTH,
  initialReviewState,
} from '@constants/review';

interface UseReviewModalProps {
  type: 'write' | 'edit';
  onSuccess(): void;
  reviewToEdit?: UserReview | null;
}

const useReviewModal = ({
  type,
  onSuccess,
  reviewToEdit,
}: UseReviewModalProps) => {
  const isEditType = type === 'edit' && !!reviewToEdit;
  const [review, setReveiw] = useState<UserReviewForm>({
    ...initialReviewState,
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
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
      if (imagePreviews.length === MAX_IMAGE_COUNT) return;
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
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (type === 'write') {
      setReveiw((prev) => {
        const images = prev.images!.filter((_, i) => i !== index);
        return { ...prev, images };
      });
    } else {
      const imageUrl = imagePreviews[index];
      const imageToDelete = reviewToEdit?.reviewImages.find(
        (img) => img.imageUrl === imageUrl,
      );
      if (imageToDelete) {
        setImagesToDelete((prev) => [...prev, imageToDelete.imageId]);
      } else {
        setReveiw((prev) => {
          const images = prev.images!.filter((_, i) => i !== index);
          return { ...prev, images };
        });
      }
    }
  };

  const deleteEmptyValueFromData = (
    data: UserReviewForm | UserReviewEditForm,
    keys: string[],
  ) => {
    keys.forEach((key) => {
      const typedKey = key as keyof typeof data;
      const value = data[typedKey];
      if (Array.isArray(value) && value.length === 0) {
        delete data[typedKey];
      }
      if (value === '') {
        delete data[typedKey];
      }
    });
  };

  const handleWriteReview = async (reservationId: string) => {
    if (!isValidToSubmit) return;
    if (error) resetError();

    const data = { ...review };
    deleteEmptyValueFromData(data, ['content', 'images']);

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

  const handleEditReview = async () => {
    if (!isValidToSubmit) return;
    if (error) resetError();

    const data = {
      userRating: review.userRating,
      petFriendlyRating: review.petFriendlyRating,
      content: review.content,
      newImages: [...(review.images ? review.images : [])],
      deletedImageId: [...imagesToDelete],
    };

    deleteEmptyValueFromData(data, ['content', 'images']);

    startIsLoading();
    try {
      await editReview(reviewToEdit?.reviewId!, data);

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

  useEffect(() => {
    const newReview = isEditType
      ? {
          userRating: 0,
          petFriendlyRating: 0,
          content: reviewToEdit.content || '',
          images: [],
        }
      : { ...initialReviewState };

    const newImagePreivews = isEditType
      ? reviewToEdit.reviewImages.map(({ imageUrl }) => imageUrl)
      : [];

    setReveiw(newReview);
    setImagePreviews(newImagePreivews);
  }, [reviewToEdit]);

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
