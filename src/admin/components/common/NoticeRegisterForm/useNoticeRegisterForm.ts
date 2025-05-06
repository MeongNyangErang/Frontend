import { FormEvent, useState } from 'react';
import useError from '@shared/hooks/ui/useError';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import { postNewNotice } from '@admin/services/adminNotices';
import useImageUploader from '@shared/hooks/ui/useImageUploader';

const useNoticeRegisterForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { images, newImages, onAddImage, onRemoveImage } = useImageUploader(1);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();

  const onChangeFormData = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateFormData = () => {
    if (!formData.title) return '제목을 입력해주세요';
    if (!formData.content) return '내용을 입력해주세요';
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validateFormData();
    if (error) {
      updateError(error);
      return;
    }

    const data = new FormData();
    const blob = new Blob([JSON.stringify(formData)], {
      type: 'application/json',
    });

    data.append('request', blob);

    if (newImages.length > 0) {
      newImages.forEach((image) => {
        data.append('image', image);
      });
    }

    startIsLoading();
    try {
      await postNewNotice(data);
      // 공지사항 목록 갱신 필요
    } catch (error) {
      console.log(error);
      updateError('등록에 실패했습니다.\n다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  return {
    formData,
    images,
    isLoading,
    error,
    onChangeFormData,
    onAddImage,
    onRemoveImage,
    handleSubmit,
    resetError,
  };
};

export default useNoticeRegisterForm;
