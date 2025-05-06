import { FormEvent } from 'react';
import useImageUploader from '@shared/hooks/ui/useImageUploader';
import useTextInput from '@shared/hooks/ui/useTextInput';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { reportReview } from '@services/review';

const MAX_TEXT_LENGTH = 1000;

const useReviewReportModal = (reviewId: number, onClose: () => void) => {
  const { images, newImages, onAddImage, onRemoveImage } = useImageUploader(1);
  const { text, onInputChange } = useTextInput(MAX_TEXT_LENGTH);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();
  const reason = text.trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    if (error) resetError();

    const blob = new Blob([JSON.stringify({ reason })], {
      type: 'application/json',
    });

    const formData = new FormData();

    formData.append('request', blob);
    if (newImages.length > 0) {
      newImages.forEach((image) => {
        formData.append('evidenceImage', image);
      });
    }

    startIsLoading();
    try {
      await reportReview(reviewId, formData);
      onClose();
    } catch (error) {
      console.log(error);
      updateError('오류가 발생했습니다. 다시 시도해주세요');
    } finally {
      endIsLoading();
    }
  };

  return {
    images,
    text,
    reason,
    error,
    isLoading,
    onAddImage,
    onRemoveImage,
    onInputChange,
    handleSubmit,
  };
};

export default useReviewReportModal;
