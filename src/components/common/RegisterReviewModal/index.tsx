import { memo } from 'react';
import { FaCamera, FaCalendarAlt } from 'react-icons/fa';
import { FaXmark, FaCircleInfo } from 'react-icons/fa6';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import StarRating from '@components/common/StarRating';
import { UserReservationItem } from '@typings/reservation';
import { UserReview } from '@typings/review';
import { formatDateStrToStrWithDay } from '@utils/date';
import { MAX_TEXT_LENGTH } from '@constants/review';

import {
  SReviewWrap,
  SReviewSummary,
  SRatingBox,
  SRatingTitle,
  SDetailBox,
  SDetailTitle,
  STextBoxWrap,
  STextBox,
  STextLength,
  SImageNotice,
  SImageBox,
  SImageButton,
  SImagePreviews,
  SImagePreviewsWrap,
  SImagePreview,
  SImageDeleteButton,
  SErrorMessage,
} from './styles';
import useRegisterReviewModal from './useRegisterReviewModal';

interface RegisterReviewModalProps {
  type: 'write' | 'edit';
  reservationToReview?: UserReservationItem | null;
  reviewToEdit?: UserReview | null;
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
  } = useRegisterReviewModal({
    type,
    onSuccess,
    ...(type === 'edit' ? { reviewToEdit } : {}),
  });

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
          <STextBoxWrap>
            <STextBox
              placeholder="반려동물과 함께한 숙소 이용 경험을 들려주세요."
              value={review.content}
              onChange={handleChangeTextArea}
            />
            <STextLength>
              {review.content?.length || 0} / {MAX_TEXT_LENGTH}
            </STextLength>
          </STextBoxWrap>
          <SImageBox>
            <input
              type="file"
              ref={imageInputRef}
              accept=".png,.jpg,.jpeg"
              onChange={handleChangeImage}
            />
            <SImageButton onClick={handleClickImageButton}>
              <FaCamera />
              <span>사진등록</span>
            </SImageButton>
            <SImagePreviews>
              <SImagePreviewsWrap>
                {imagePreviews.map((preview, index) => {
                  return (
                    <SImagePreview key={preview}>
                      <img src={preview} alt={`이미지 프리뷰 ${index}`} />
                      <SImageDeleteButton
                        onClick={() => handleDeleteImage(index)}
                      >
                        <FaXmark />
                      </SImageDeleteButton>
                    </SImagePreview>
                  );
                })}
              </SImagePreviewsWrap>
            </SImagePreviews>
          </SImageBox>
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
