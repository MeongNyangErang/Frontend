import Modal from '@shared/components/common/Modal';
import { ReviewToReport } from '@typings/report';
import ImageUploader from '@shared/components/common/ImageUploader';
import TextEditor from '@shared/components/common/TextEditor';
import Button from '@shared/components/common/Button';
import useReviewReportModal from './useReviewReportModal';

import {
  SReportModalTitle,
  SSectionName,
  SReviewToReport,
  SReportForm,
  ImageUploaderWrap,
  SErrorMessage,
} from './styles';

interface ReviewReportModalProps {
  review: ReviewToReport;
  onClose: () => void;
}

const MAX_TEXT_LENGTH = 1000;

const ReviewReportModal = ({ review, onClose }: ReviewReportModalProps) => {
  const { reviewId, content, nickname } = review;
  const {
    images,
    text,
    reason,
    error,
    isLoading,
    onAddImage,
    onRemoveImage,
    onInputChange,
    handleSubmit,
  } = useReviewReportModal(reviewId, onClose);

  return (
    <Modal isOpen closeType="x" variant="centered" onClose={onClose}>
      <SReportModalTitle>리뷰 신고</SReportModalTitle>
      <SSectionName>신고 대상</SSectionName>
      <SReviewToReport>
        <p>{nickname}</p>
        <div>{content}</div>
      </SReviewToReport>
      <SSectionName>신고 사유</SSectionName>
      <SReportForm onSubmit={handleSubmit}>
        <TextEditor
          text={text}
          onChange={onInputChange}
          maxLength={MAX_TEXT_LENGTH}
        />
        <ImageUploaderWrap>
          <ImageUploader
            images={images}
            onAdd={onAddImage}
            onRemove={onRemoveImage}
          />
        </ImageUploaderWrap>
        <Button
          variant="grayBorder"
          type="submit"
          disabled={!reason || isLoading}
          fixedHeight
          fullWidth
        >
          제출하기
        </Button>
        <SErrorMessage>{error}</SErrorMessage>
      </SReportForm>
    </Modal>
  );
};

export default ReviewReportModal;
