import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import Header from '@components/common/RegisterHeader/index';

interface ReviewList {
  userId: number;
  roomId: number;
  reviewId: number;
  roomName: string;
  totalRating: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<ReviewList[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [lastReviewId, setLastReviewId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchReviews = async () => {
    if (!hasMore) return;

    try {
      const response = await axios.get(`${BASE_URL}/review-list`, {
        params: {
          size: 10,
          ...(lastReviewId !== null && { lastReviewId }),
        },
      });

      const newReviews = response.data;
      setReviews((prev) => [...prev, ...newReviews]);

      if (newReviews.length < 10) {
        setHasMore(false);
      } else {
        setLastReviewId(newReviews[newReviews.length - 1].reviewId);
      }
    } catch (error) {
      console.error('리뷰 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleExpand = (reviewId: number) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  if (reviews.length === 0) {
    return <NoReviewsMessage>등록된 리뷰가 없습니다.</NoReviewsMessage>;
  }

  return (
    <div>
      <Header title="리뷰 목록" />
      {reviews.map((review) => {
        const isExpanded = expandedReviews.includes(review.reviewId);
        const shouldShowToggle = review.content.length > 200;

        return (
          <ReviewContainer key={`${review.reviewId}-${review.roomId}`}>
            <Name>
              <RoomName>{review.roomName}</RoomName>
            </Name>
            <ReviewHeader>
              <User>{review.userId}</User>
              <CreatedAt>
                {new Date(review.createdAt).toISOString().split('T')[0]}
              </CreatedAt>
            </ReviewHeader>
            <Rating>
              <StarRatings
                rating={review.totalRating}
                starRatedColor="#f03e5e"
                numberOfStars={5}
                name="rating"
                starDimension="16px"
                starSpacing="1px"
              />
            </Rating>
            {review.imageUrls.length > 0 && (
              <ImageGallery>
                {review.imageUrls.map((url, index) => (
                  <ReviewImage
                    key={index}
                    src={url}
                    alt={`review-image-${index}`}
                  />
                ))}
              </ImageGallery>
            )}

            <ReviewContent>
              {isExpanded || !shouldShowToggle
                ? review.content
                : `${review.content.slice(0, 400)}...`}
              {shouldShowToggle && (
                <ToggleButton onClick={() => toggleExpand(review.reviewId)}>
                  {isExpanded ? '접기' : '더보기'}
                </ToggleButton>
              )}
            </ReviewContent>
          </ReviewContainer>
        );
      })}
    </div>
  );
};

export default ReviewList;

// 스타일 정의
const ReviewContainer = styled.div`
  font-family: 'Noto Sans KR';
  padding-bottom: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
const Name = styled.div`
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 5px;
`;

const User = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: var(--gray-700);
`;

const ReviewHeader = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: space-between;
`;

const RoomName = styled.p`
  font-size: 16px;
`;

const Rating = styled.span`
  font-size: 16px;
  padding-left: 16px;
`;

const ReviewContent = styled.p`
  padding: 0 16px;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-top: 5px;
`;

const ImageGallery = styled.div`
  margin: 5px 0;
  display: flex;
  gap: 8px;
`;

const ReviewImage = styled.img`
  padding-left: 16px;
  max-width: 120px;
  max-height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const CreatedAt = styled.p`
  padding: 0 16px;
  font-size: 14px;
  color: #999;
`;

const NoReviewsMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: var(--gray-700);
`;

const ToggleButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: var(--gray-500);
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  padding: 0;
`;
