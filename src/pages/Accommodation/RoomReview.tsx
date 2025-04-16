import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { FaStar } from 'react-icons/fa';
import { fetchCall } from '@services/api';

interface RoomReview {
  nickname: String;
  profileImageUrl: string;
  roomName: string;
  totalRating: number;
  content: string;
  reviewImageUrl: string[];
  createdAt: string;
}

type RoomReviewData = RoomReview[];

const RoomReview = () => {
  const [roomReview, setRoomReview] = useState<RoomReviewData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  const accommodationId = pathname.split('/')[2];

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = (await fetchCall(
          `accommodations/${accommodationId}/reviews`,
          'get',
        )) as any;

        setRoomReview(response.content);
      } catch (error) {
        console.error('리뷰 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchRoomDetails();
  }, []);

  return (
    <Card>
      <Title>
        <Star />
        리얼 리뷰
      </Title>
      {roomReview ? (
        roomReview.map((r) => (
          <Fragment key={r.createdAt}>
            <Header>
              <ProfileImage src={r.profileImageUrl} alt={`프로필 이미지`} />
              <Info>
                <Nickname>{r.nickname}</Nickname>
                <Date>{r.createdAt}</Date>
              </Info>
            </Header>
            <Rating>
              <StarRatings
                rating={r.totalRating}
                starRatedColor="#f03e5e"
                numberOfStars={5}
                name="rating"
                starDimension="17px"
                starSpacing="1px"
              />
            </Rating>
            {r.reviewImageUrl && r.reviewImageUrl.length > 0 && (
              <ReviewImageContainer>
                {r.reviewImageUrl.slice(0, 3).map((imageUrl, index) => (
                  <ReviewImage
                    key={index}
                    src={imageUrl}
                    alt={`리뷰 이미지 ${index + 1}`}
                  />
                ))}
              </ReviewImageContainer>
            )}
            <RoomName>[ {r.roomName} ]</RoomName>
            <Content isExpanded={isExpanded}>{r.content}</Content>
            {r.content?.length > 100 && (
              <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '접기' : '더보기'}
              </ToggleButton>
            )}
          </Fragment>
        ))
      ) : (
        <NoReviewMessage>등록된 리뷰가 없습니다.</NoReviewMessage>
      )}
    </Card>
  );
};
export default RoomReview;

const Card = styled.div`
  font-family: 'Noto Sans KR';
  border-bottom: 1px solid #000;
  padding: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
`;

const Star = styled(FaStar)`
  color: #f03e5e;
  margin-right: 5px;
  font-size: 22px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const Date = styled.div`
  color: #777;
  font-size: 12px;
`;

const RoomName = styled.div`
  font-size: 14px;
  margin: 8px 0;
  color: var(--gray-500);
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 14px;
  color: #f03e5e;
  margin-bottom: 5px;
`;

const Content = styled.p<{ isExpanded: boolean }>`
  font-size: 15px;
  color: var(--gray-700);
  margin-bottom: 10px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: ${({ isExpanded }) => (isExpanded ? 'unset' : 3)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
`;

const ToggleButton = styled.button`
  color: var(--gray-600);
`;

const ReviewImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ReviewImageContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
  overflow-x: auto;
`;

const NoReviewMessage = styled.div`
  font-size: 16px;
  color: var(--gray-700);
  text-align: center;
  padding: 20px 0;
`;
