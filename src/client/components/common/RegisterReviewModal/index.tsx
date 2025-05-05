import { memo } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import Modal from '@shared/components/common/Modal';
import Button from '@shared/components/common/Button';
import StarRating from '@components/common/StarRating';
import { UserReservationItem } from '@typings/reservation';
import { UserReview } from '@typings/review';
import { formatDateStrToStrWithDay } from '@utils/date';
import { MAX_TEXT_LENGTH } from '@constants/review';
import ImageUploader from '@shared/components/common/ImageUploader';
import TextEditor from '@shared/components/common/TextEditor';

import {
  SReviewWrap,
  SReviewSummary,
  SRatingBox,
  SRatingTitle,
  SDetailBox,
  SDetailTitle,
  SImageNotice,
  SErrorMessage,
} from './styles';
import useRegisterReviewModal from './useRegisterReviewModal';

interface RegisterReviewModalProps {
  type: 'write' | 'edit';
  reservationToReview?: UserReservationItem;
  reviewToEdit?: UserReview;
  onClose: () => void;
  onSuccess: () => void;
}

const RegisterReviewModal = ({
  type,
  reservationToReview,
  reviewToEdit,
  onClose,
  onSuccess,
}: RegisterReviewModalProps) => {
  const {
    reservationId,
    accommodationName,
    roomName,
    checkInDate,
    checkOutDate,
  } = reservationToReview || {};

  const {
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
  } = useRegisterReviewModal(
    onSuccess,
    !!reviewToEdit ? reviewToEdit : undefined,
  );

  return (
    <Modal
      isOpen={!!reservationToReview || !!reviewToEdit}
      variant="full"
      closeType="x"
      onClose={() => {
        resetReview();
        onClose();
      }}
    >
      <SReviewWrap>
        {reservationToReview && (
          <SReviewSummary>
            <div>{accommodationName}</div>
            <span>{roomName}</span>
            <p>
              <FaCalendarAlt />
              {formatDateStrToStrWithDay(checkInDate!)}
              <span>~</span>
              <FaCalendarAlt />
              {formatDateStrToStrWithDay(checkOutDate!)}
            </p>
          </SReviewSummary>
        )}
        <SRatingBox>
          <SRatingTitle>숙소는 만족하셨나요?</SRatingTitle>
          <StarRating
            rate={review.userRating}
            onChange={onChangeStarRates('userRating')}
            size="3em"
            $mainColor
          />
        </SRatingBox>
        <SRatingBox>
          <SRatingTitle>반려동물과 함께하기 적합했나요?</SRatingTitle>
          <StarRating
            rate={review.petFriendlyRating}
            onChange={onChangeStarRates('petFriendlyRating')}
            size="3em"
            $mainColor
          />
        </SRatingBox>
        <SDetailBox>
          <SDetailTitle>
            상세 리뷰를 남겨주세요<span>(선택)</span>
          </SDetailTitle>
          <TextEditor
            maxLength={MAX_TEXT_LENGTH}
            text={text}
            onChange={onInputChange}
          />
          <ImageUploader
            images={images}
            onAdd={onAddImage}
            onRemove={onRemoveImage}
          />
          <SImageNotice>
            <FaCircleInfo />
            이미지는 최대 3장까지 등록 가능합니다.
          </SImageNotice>
        </SDetailBox>
        <Button
          onClick={() => handleSubmit(reservationId!)}
          variant="main"
          fontSize="14px"
          fullWidth
          fixedHeight
          disabled={!isValidToSubmit || isLoading}
        >
          {type === 'edit' ? '리뷰 수정' : '리뷰 등록'}
        </Button>
        <SErrorMessage>{error}</SErrorMessage>
      </SReviewWrap>
    </Modal>
  );
};

export default memo(RegisterReviewModal);
