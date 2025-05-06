import { useState, useEffect, Fragment } from 'react';
import { PiSirenBold } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { FaStar } from 'react-icons/fa';
import { fetchCall } from '@services/api';
import useAuth from '@hooks/auth/useAuth';
import ReviewReportModal from '@components/common/ReviewReportModal';
import useReviewReport from '@hooks/ui/useReviewReport';

interface RoomReview {
  reviewId: number;
  nickname: string;
  profileImageUrl: string;
  roomName: string;
  totalRating: number;
  content: string;
  reviewImages: string[];
  createdAt: string;
}

const RoomReview = () => {
  const [roomReview, setRoomReview] = useState<RoomReview[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { pathname } = useLocation();
  const accommodationId = pathname.split('/')[2];
  const { member } = useAuth();
  const { reviewToReport, handleReportClick, handleReportClose } =
    useReviewReport();
  const isUserLoggedIn = member.data?.role === 'USER';

  const fetchRoomDetails = async () => {
    if (!hasMore) return;

    try {
      const response = (await fetchCall(
        `accommodations/${accommodationId}/reviews?page${page}&size=20`,
        'get',
      )) as any;

      const newReviews: RoomReview[] = response.content || [];
      setRoomReview((prev) => [...prev, ...newReviews]);

      if (response.last) setHasMore(false);
    } catch (error) {
      console.error('리뷰 불러오기 실패:', error);
    }
  };

  const handleClickReportButton = (
    reviewId: number,
    nickname: string,
    content: string,
  ) => {
    if (!isUserLoggedIn) {
      alert('로그인 유저만 신고 가능합니다.');
      return;
    }

    handleReportClick(reviewId, nickname, content);
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;

      const reachedBottom = scrollY + innerHeight >= bodyHeight - 200;

      if (reachedBottom && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  return (
    <Card>
      <Title>
        <Star />
        리얼 리뷰
      </Title>
      {roomReview.length > 0 ? (
        roomReview.map((r) => (
          <Fragment key={r.reviewId}>
            <Body>
              <Header>
                <ProfileImage src={r.profileImageUrl} alt={`프로필 이미지`} />
                <Info>
                  <Nickname>{r.nickname}</Nickname>
                  <Date>{r.createdAt}</Date>
                </Info>
                <SReportButton
                  onClick={() =>
                    handleClickReportButton(r.reviewId, r.nickname, r.content)
                  }
                >
                  <PiSirenBold />
                </SReportButton>
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
              {r.reviewImages && r.reviewImages.length > 0 && (
                <ReviewImageContainer>
                  {r.reviewImages.slice(0, 3).map((imageUrl, index) => (
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
            </Body>
          </Fragment>
        ))
      ) : (
        <NoReviewMessage>등록된 리뷰가 없습니다.</NoReviewMessage>
      )}
      {reviewToReport && (
        <ReviewReportModal
          review={reviewToReport}
          onClose={handleReportClose}
        />
      )}
    </Card>
  );
};
export default RoomReview;

const Card = styled.div`
  font-family: 'Noto Sans KR';
  padding: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Body = styled.div`
  border-bottom: 1px solid rgb(235, 233, 233);
  padding-bottom: 8px;
  margin-top: 15px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 233, 233);
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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SReportButton = styled.button`
  display: flex;
  font-size: 18px;
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
