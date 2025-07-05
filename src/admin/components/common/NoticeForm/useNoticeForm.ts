import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useError from '@shared/hooks/ui/useError';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import { postNewNotice, editNotice } from '@admin/services/adminNotices';
import useImageUploader from '@shared/hooks/ui/useImageUploader';
import { NoticeDetail } from '@shared/typings/notices';
import ROUTES from '@admin/constants/routes';
import useNoticeList from '@admin/hooks/query/useNoticeList';

const useNoticeForm = (initialData: NoticeDetail | undefined) => {
  const { title, content, noticeImageUrl, noticeId } = initialData || {};
  const [formData, setFormData] = useState({
    title: title ? title : '',
    content: content ? content : '',
  });
  const { images, newImages, onAddImage, onRemoveImage } = useImageUploader(
    1,
    noticeImageUrl ? [noticeImageUrl] : undefined,
  );
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();
  const { refreshNoticeList } = useNoticeList(0, false);
  const navigate = useNavigate();

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
      noticeId === undefined
        ? await postNewNotice(data)
        : await editNotice(noticeId, data);
      await refreshNoticeList();
      navigate(ROUTES.notices.root(0));
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

export default useNoticeForm;
