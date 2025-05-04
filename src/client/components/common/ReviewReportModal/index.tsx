import Modal from '@shared/components/common/Modal';
import { ReviewToReport } from '@typings/report';
import {
  SReportModalTitle,
  SSectionName,
  SReviewToReport,
  SReportForm,
  SReportTextareaWrap,
  SReportTextarea,
  STextLengthCounter,
} from './styles';

interface ReviewReportModalProps {
  review: ReviewToReport | null;
  onClose: () => void;
}

const MAX_TEXT_LENGTH = 1000;

const ReviewReportModal = ({ review, onClose }: ReviewReportModalProps) => {
  const { reviewId, content, nickname } = review || {};

  return (
    <Modal isOpen={!!review} closeType="x" variant="centered" onClose={onClose}>
      {review && (
        <>
          <SReportModalTitle>리뷰 신고</SReportModalTitle>
          <SSectionName>신고 대상</SSectionName>
          <SReviewToReport>
            <p>{nickname}</p>
            <div>{content}</div>
          </SReviewToReport>
          <SSectionName>신고 사유</SSectionName>
          <SReportForm>
            <SReportTextareaWrap>
              <SReportTextarea placeholder="신고사유를 입력해주세요" />
              <STextLengthCounter>
                <span></span>/{MAX_TEXT_LENGTH}
              </STextLengthCounter>
            </SReportTextareaWrap>
          </SReportForm>
        </>
      )}
    </Modal>
  );
};

export default ReviewReportModal;
