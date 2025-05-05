import { FormEvent, useState } from 'react';
import Button from '@shared/components/common/Button';
import Modal from '@shared/components/common/Modal';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import useError from '@shared/hooks/ui/useError';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import { parseNewLine } from '@shared/utils/formatter';
import { postNewNotice } from '@admin/services/adminNotices';
import useImageUploader from '@shared/hooks/ui/useImageUploader';
import ImageUploader from '@shared/components/common/ImageUploader';

import {
  SNoticeForm,
  SNoticeTitleInput,
  SNoticeContetTextarea,
} from './styles';

const NoticeCreate = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { images, newImages, onAddImage, onRemoveImage } = useImageUploader(
    1,
    undefined,
  );
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
    } catch (error) {
      console.log(error);
      updateError('등록에 실패했습니다.\n다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  return (
    <>
      <SSubPageTitle>공지 작성</SSubPageTitle>
      <SNoticeForm onSubmit={handleSubmit}>
        <SNoticeTitleInput
          placeholder="제목을 입력해주세요"
          value={formData.title}
          onChange={(e) => onChangeFormData('title', e.target.value)}
        />
        <SNoticeContetTextarea
          placeholder="내용을 입력해주세요"
          value={formData.content}
          onChange={(e) => onChangeFormData('content', e.target.value)}
        />
        <ImageUploader
          images={images}
          onAdd={onAddImage}
          onRemove={onRemoveImage}
        />
        <Button
          variant="grayBorder"
          type="submit"
          fontSize="14px"
          isLoading={isLoading}
          fixedHeight
        >
          등록하기
        </Button>
        <Modal
          variant="centered"
          closeType="none"
          role="alert"
          isOpen={!!error}
          onClose={resetError}
        >
          {parseNewLine(error)}
        </Modal>
      </SNoticeForm>
    </>
  );
};

export default NoticeCreate;
