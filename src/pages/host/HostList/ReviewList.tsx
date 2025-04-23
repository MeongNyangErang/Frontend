import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import Header from '@components/common/RegisterHeader/index';
import { fetchCall } from '@services/api';

interface ReviewList {
  nickname: string;
  roomId: number;
  reviewId: number;
  roomName: string;
  totalRating: number;
  reviewContent: string;
  imageUrls: string[];
  createdAt: string;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<ReviewList[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const fetchReviews = async () => {
    if (!hasMore) return;

    try {
      const response = (await fetchCall(
        `hosts/reviews?page=${page}&size=20`,
        'get',
      )) as any;

      const newReviews = Array.isArray(response?.data?.content)
        ? response.data.content
        : [];

      if (newReviews.length > 0) {
        setReviews((prev) => [...prev, ...newReviews]);
        setSize(response.data.size);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setIsFirst(response.data.first);

        if (response.data.last) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('리뷰 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (reviews.length === 0) {
    return <NoReviewsMessage>등록된 리뷰가 없습니다.</NoReviewsMessage>;
  }

  return (
    <div onScroll={handleScroll}>
      <Header title="리뷰 목록" />
      <ReviewInfo>총 {reviews.length}개 리뷰</ReviewInfo>
      {reviews.map((review) => (
        <ReviewContainer key={`${review.reviewId}-${review.roomId}`}>
          <Name>
            <RoomName>{review.roomName}</RoomName>
          </Name>
          <ReviewHeader>
            <User>{review.nickname}</User>
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
          <ReviewContent>{review.reviewContent}</ReviewContent>
        </ReviewContainer>
      ))}
    </div>
  );
};

export default ReviewList;

// 스타일 정의
const ReviewContainer = styled.div`
  font-family: 'Noto Sans KR';
  margin: 20px auto 30px auto;
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
  padding-left: 10px;
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
  max-width: 200px;
  max-height: 200px;
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
  padding: 16px;
  font-size: 16px;
  color: var(--gray-700);
`;

const ReviewInfo = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
  font-size: 16px;
  font-weight: bold;
  color: var(--gray-600);
`;
