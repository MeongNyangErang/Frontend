import Modal from '@shared/components/common/Modal';
import { parseNewLine } from '@shared/utils/formatter';
import ImageUploader from '@shared/components/common/ImageUploader';
import TextEditor from '@shared/components/common/TextEditor';
import Button from '@shared/components/common/Button';
import useNoticeRegisterForm from './useNoticeRegisterForm';
import { SNoticeForm, SNoticeTitleInput, SImageUploaderWrap } from './styles';

const NoticeRegisterForm = () => {
  const {
    formData,
    images,
    isLoading,
    error,
    onChangeFormData,
    onAddImage,
    onRemoveImage,
    handleSubmit,
    resetError,
  } = useNoticeRegisterForm();

  return (
    <>
      <SNoticeForm onSubmit={handleSubmit}>
        <SNoticeTitleInput
          placeholder="제목을 입력해주세요"
          value={formData.title}
          onChange={(e) => onChangeFormData('title', e.target.value)}
        />
        <TextEditor
          text={formData.content}
          onChange={(e) => onChangeFormData('content', e.target.value)}
          maxLength={1000}
          $height={320}
        />
        <SImageUploaderWrap>
          <ImageUploader
            images={images}
            onAdd={onAddImage}
            onRemove={onRemoveImage}
          />
        </SImageUploaderWrap>
        <Button
          variant="grayBorder"
          type="submit"
          fontSize="14px"
          isLoading={isLoading}
          fixedHeight
        >
          등록하기
        </Button>
      </SNoticeForm>
      <Modal
        variant="centered"
        closeType="none"
        role="alert"
        isOpen={!!error}
        onClose={resetError}
      >
        {parseNewLine(error)}
      </Modal>
    </>
  );
};

export default NoticeRegisterForm;
