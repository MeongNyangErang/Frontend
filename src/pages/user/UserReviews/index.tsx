import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import SubPageHeader from '@components/common/SubPageHeader';
import StarRating from '@components/common/StarRating';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import RegisterReviewModal from '@components/common/RegisterReviewModal';
import useUserReviewsPage from '@hooks/page/useUserReviewsPage';
import ReviewImageGallery from './ReviewImageGallery';
import DeleteReviewModal from './DeleteReviewModal';
import {
  SReviews,
  SReview,
  SReviewHeader,
  SReviewBody,
  SRateBox,
  SContentBox,
  STextBox,
  SButtonBox,
  SReivewsBottom,
} from './styles';

const UserReviews = () => {
  const {
    reviews,
    reviewToEdit,
    reviewIdToDelete,
    isFirstLoaded,
    isLoading,
    error,
    observeTargetRef,
    handleClickDeleteButton,
    handleClickEditButton,
    onCloseDeleteModal,
    onCloseEditModal,
    onSuccessDeleteReview,
    onSuccessEditReview,
  } = useUserReviewsPage();

  return (
    <>
      <SubPageHeader title="내 리뷰" style="noButton" />
      {error && (
        <MessageBox>
          {error.message || '에러가 발생했습니다. 새로고침 해주세요.'}
        </MessageBox>
      )}
      {!error && isFirstLoaded && reviews.length === 0 && (
        <MessageBox>작성한 리뷰가 없습니다.</MessageBox>
      )}
      {!error && (
        <>
          <SReviews>
            {reviews.map((review) => {
              const {
                accommodationName,
                reviewImages,
                reviewId,
                content,
                createdAt,
                totalRating,
              } = review;
              return (
                <SReview key={reviewId}>
                  <SReviewHeader>
                    <h3>{accommodationName}</h3>
                  </SReviewHeader>
                  <SReviewBody>
                    <SContentBox>
                      <SRateBox>
                        <StarRating
                          rate={totalRating}
                          $mainColor
                          size="1.4em"
                          $readOnly
                        />
                        <p>{createdAt}</p>
                      </SRateBox>
                      <ReviewImageGallery images={reviewImages} />
                      <STextBox>{content}</STextBox>
                    </SContentBox>
                    <SButtonBox>
                      <Button
                        variant="grayBorder"
                        fontSize="13px"
                        onClick={() => handleClickDeleteButton(reviewId)}
                      >
                        <FaTrash /> 리뷰 삭제
                      </Button>
                      <Button
                        variant="grayBorder"
                        fontSize="13px"
                        onClick={() => handleClickEditButton(review)}
                      >
                        <FaPencilAlt /> 리뷰 수정
                      </Button>
                    </SButtonBox>
                  </SReviewBody>
                </SReview>
              );
            })}
          </SReviews>
          <SReivewsBottom ref={isFirstLoaded ? observeTargetRef : null}>
            {isLoading && <Loader loading color="grayBorder" size={8} />}
          </SReivewsBottom>
          <DeleteReviewModal
            reviewId={reviewIdToDelete}
            onClose={onCloseDeleteModal}
            onSuccess={onSuccessDeleteReview}
          />
          <RegisterReviewModal
            type="edit"
            onClose={onCloseEditModal}
            onSuccess={onSuccessEditReview}
            reviewToEdit={reviewToEdit}
          />
        </>
      )}
    </>
  );
};

export default UserReviews;
