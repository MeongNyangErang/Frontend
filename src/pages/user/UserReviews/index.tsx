import { useState, useEffect, useCallback } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import SubPageHeader from '@components/common/SubPageHeader';
import StarRating from '@components/common/StarRating';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import useUserReviews from '@hooks/query/user/userUserReviews';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { UserReview } from '@typings/review';
import ReviewImageGallery from './ReviewImageGallery';
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
  const [currentCursor, setCurrentCursor] = useState<undefined | number>(
    undefined,
  );

  const [reviews, setReviews] = useState<UserReview[]>([]);

  const {
    data: { content, cursor, hasNext } = {},
    isLoading,
    error,
  } = useUserReviews(currentCursor);

  const updateCurrentCursor = useCallback(() => {
    setCurrentCursor(cursor);
  }, [cursor]);

  const observeTargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && !!hasNext,
  );

  useEffect(() => {
    if (!content) return;
    setReviews((prev) => [...prev, ...content]);
  }, [content]);

  return (
    <>
      <SubPageHeader title="내 리뷰" style="noButton" />
      {error && (
        <MessageBox>
          {error.message || '에러가 발생했습니다. 새로고침 해주세요.'}
        </MessageBox>
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
                      <Button variant="grayBorder" fontSize="13px">
                        <FaTrash /> 리뷰 삭제
                      </Button>
                      <Button variant="grayBorder" fontSize="13px">
                        <FaPencilAlt /> 리뷰 수정
                      </Button>
                    </SButtonBox>
                  </SReviewBody>
                </SReview>
              );
            })}
          </SReviews>
          <SReivewsBottom ref={observeTargetRef}>
            {isLoading && <Loader loading color="grayBorder" size={8} />}
          </SReivewsBottom>
        </>
      )}
    </>
  );
};

export default UserReviews;
