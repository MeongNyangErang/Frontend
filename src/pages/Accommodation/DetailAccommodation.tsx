import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import { GiChessQueen } from 'react-icons/gi';
import StarRatings from 'react-star-ratings';
import { fetchCall } from '@services/api';

interface DetailData {
  accommodationId: number;
  name: string;
  description: string;
  address: string;
  detailedAddress: string;
  type: string;
  thumbnailUrl: string;
  accommodationImagesUrls: string[];
  totalRating: string;
  accommodationFacilities: string[];
  accommodationPetFacilities: string[];
  allowedPets: string[];
  latitude: number;
  longitude: number;
  reviews: ReviewData[];
  roomDetails: RoomData[];
}

interface RoomData {
  roomId: number;
  roomName: string;
  roomImageUrl: string;
  price: number;
  standardPeopleCount: number;
  maxPeopleCount: number;
  standardPetCount: number;
  maxPetCount: number;
  extraPeopleFee: number;
  extraPetFee: number;
  extraFee: number;
  checkInTime: string;
  checkOutTime: string;
}

interface ReviewData {
  reviewId: number;
  reviewRating: number;
  content: string;
  createdAt: string;
}

const DetailAccommodation = () => {
  const [accommodation, setAccommodation] = useState<DetailData | null>(null);
  const [showAllRooms, setShowAllRooms] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accommodationId = pathname.split('/').splice(-1);

  const publicHolidays = ['2025-01-01', '2025-12-25'];

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isHoliday = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return publicHolidays.includes(dateString);
  };

  const getRoomPrice = (room: RoomData) => {
    const today = new Date();
    const isWeekendDay = isWeekend(today);
    const isHolidayDay = isHoliday(today);

    let finalPrice = room.price;

    if (isWeekendDay || isHolidayDay) {
      finalPrice += room.extraFee;
    }

    return finalPrice;
  };

  useEffect(() => {
    const getAccommodationDetails = async () => {
      try {
        const response = (await fetchCall(
          `accommodations/${accommodationId}`,
          'get',
        )) as any;
        console.log(response);
        const accommodationData = response;

        const sortedReviews = accommodationData.reviews.sort(
          (a: ReviewData, b: ReviewData) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          },
        );

        setAccommodation({
          ...response,
          review: sortedReviews,
        });
      } catch (error) {
        console.log('숙소 정보를 가져오는 데 오류가 발생했습니다.');
      } finally {
        console.log('API 요청이 완료되었습니다.');
      }
    };
    getAccommodationDetails();
  }, []);

  const handleShowMoreRooms = () => {
    setShowAllRooms(!showAllRooms);
  };

  const handleAllReviews = () => {
    navigate(`/accommodation/${accommodationId}/review`);
  };

  const handleRoomviews = (roomId: number) => {
    navigate(`/accommodation/${accommodationId}/room/${roomId}`);
  };

  const handleAllReserve = () => {
    navigate(`/accommodation/${accommodationId}/reservation`);
  };

  return (
    <Container>
      {accommodation && (
        <>
          <TumbnailImage src={accommodation.thumbnailUrl} />
          <AccommodationName>
            {accommodation.name}
            <Text>{accommodation.totalRating}</Text>
          </AccommodationName>

          <Title>{accommodation.type}</Title>
          {accommodation.allowedPets.map((v) => (
            <Title key={v}>{v}</Title>
          ))}

          <Section>
            <All>
              <Real>리얼 리뷰</Real>
              <SeeAllButton onClick={handleAllReviews}>전체보기</SeeAllButton>
            </All>
            {accommodation.reviews && accommodation.reviews.length > 0 ? (
              <ReviewContainer>
                {accommodation.reviews.map((review, index) => (
                  <ReviewCard key={`review-${review.reviewId}-${index}`}>
                    <All>
                      <ReviewRatingWrapper>
                        <StarRatings
                          rating={review.reviewRating}
                          starRatedColor="#f03e5e"
                          numberOfStars={5}
                          name="rating"
                          starDimension="17px"
                          starSpacing="1px"
                        />
                      </ReviewRatingWrapper>
                      <ReviewDate>{review.createdAt}</ReviewDate>
                    </All>
                    <ReviewContent>
                      <ReviewText>{review.content}</ReviewText>
                    </ReviewContent>
                  </ReviewCard>
                ))}
              </ReviewContainer>
            ) : (
              <p>아직 리뷰가 없습니다</p>
            )}
          </Section>

          <SectionTitle>객실선택</SectionTitle>
          {accommodation.roomDetails && accommodation.roomDetails.length > 0 ? (
            <RoomContainer>
              {accommodation.roomDetails
                .slice(0, showAllRooms ? accommodation.roomDetails.length : 2)
                .map((room) => (
                  <RoomCard key={room.roomId}>
                    <RoomInfoLeft>
                      <RoomImage
                        src={
                          room.roomImageUrl
                            ? room.roomImageUrl
                            : 'default-room-image.jpg'
                        }
                        alt={room.roomName}
                      />
                      <RoomName>{room.roomName}</RoomName>
                      <RoomInfo>
                        <Count>
                          인원 {room.standardPeopleCount}명 / 최대{' '}
                          {room.maxPeopleCount}명
                        </Count>
                        <Count>
                          반려동물 {room.standardPetCount}마리 / 최대{' '}
                          {room.maxPetCount}마리
                        </Count>
                      </RoomInfo>
                    </RoomInfoLeft>
                    <RoomInfoRight>
                      <All>
                        <RoomTitle>숙박</RoomTitle>
                        <Detail onClick={() => handleRoomviews(room.roomId)}>
                          상세보기
                        </Detail>
                      </All>
                      <RoomInfo>
                        <Check>
                          체크인 {room.checkInTime} ~ 체크아웃{' '}
                          {room.checkOutTime}
                        </Check>
                      </RoomInfo>
                      <RoomInfo>
                        <CheckInfo>[1인 / 1마리 추가요금]</CheckInfo>
                        <Check>
                          인원 {room.extraPeopleFee.toLocaleString()}
                        </Check>
                        <Check>
                          반려동물 {room.extraPetFee.toLocaleString()}
                        </Check>
                      </RoomInfo>
                      <RoomInfo>
                        <Price>
                          {(room.price + room.extraFee).toLocaleString()}
                        </Price>
                      </RoomInfo>
                      <RoomButton onClick={handleAllReserve}>
                        예약하기
                      </RoomButton>
                    </RoomInfoRight>
                  </RoomCard>
                ))}
            </RoomContainer>
          ) : (
            <p>현재 방이 없습니다</p>
          )}
          <Open onClick={handleShowMoreRooms}>
            {showAllRooms ? '접기' : '더보기'}
          </Open>

          <SectionTitle>숙소 소개</SectionTitle>
          <AccommodationDescription>
            <QuotesL /> <br />
            {accommodation.description} <br />
            <QuotesR />
          </AccommodationDescription>

          <ImageTitle>
            <Queen />
            <br />
            {accommodation.name}
          </ImageTitle>
          {accommodation.accommodationImagesUrls &&
          accommodation.accommodationImagesUrls.length > 0 ? (
            accommodation.accommodationImagesUrls.map((image, index) => (
              <AccommodationImage
                key={index}
                src={image}
                alt={`Accommodation image ${index + 1}`}
              />
            ))
          ) : (
            <p>이미지가 없습니다</p>
          )}

          <SectionTitle>숙소 편의시설</SectionTitle>
          <Facility>
            {accommodation.accommodationFacilities.map((facility, index) => (
              <FacilityItem key={index}>{facility}</FacilityItem>
            ))}
          </Facility>
          <SectionTitle>반려동물 편의시설</SectionTitle>
          <Facility>
            {accommodation.accommodationPetFacilities.map((facility, index) => (
              <FacilityItem key={index}>{facility}</FacilityItem>
            ))}
          </Facility>

          <SectionTitle>위치</SectionTitle>
          <Address>{accommodation.address}</Address>
          <Address>{accommodation.detailedAddress}</Address>
          {/* 
            <Address>
              {accommodation.latitude}
              {accommodation.longitude}
            </Address>
            */}

          <SectionTitle>취소 및 환불 규정</SectionTitle>
          <Refund>
            ■ 체크인일 기준 3일 전까지 : 100% 환불 <br />
            ■ 체크인일 기준 2일 전까지 : 최초 1일 숙박 요금의 70% 환불
            <br />
            ■ 체크인일 기준 1일 전까지 : 최초 1일 숙박 요금의 50% 환불 <br />
            ■ 체크인일 당일 및 No-Show : 최초 1일 숙박 요금 환불불가 <br />■ 각
            구매한 상품별 별도의 취소 규정이 적용되오니 참고 부탁드립니다
          </Refund>
        </>
      )}
    </Container>
  );
};

export default DetailAccommodation;
const ReviewRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const All = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  padding: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Content = styled.div`
  margin-top: 10px;
`;

const AccommodationImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
`;

const ImageTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin-top: 20px;
`;

const TumbnailImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
`;

const AccommodationName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: var(--gray-700);
  margin: 15px 0;
`;

const Title = styled.div`
  font-size: 14px;
  color: var(--gray-600);
  border: 1px solid #e0e0e0;
  padding: 5px 10px;
  text-align: center;
  border-radius: 15px;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 20px;
`;

const RoomTitle = styled.div`
  font-size: 16px;
  color: var(--gray-700);
  font-weight: bold;
  margin-bottom: 5px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  color: var(--gray-700);
  font-weight: bold;
  margin-top: 20px;
  display: inline-block;
`;

const Real = styled.h3`
  font-size: 16px;
  color: var(--gray-700);
  font-weight: bold;
  margin: 10px 5px;
  display: inline-block;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 15px;
`;

const RoomInfoLeft = styled.div`
  width: 48%;
`;

const RoomInfoRight = styled.div`
  width: 50%;
  height: 250px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 20px;
`;

const Count = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: var(--gray-700);
`;

const Check = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: var(--gray-700);
`;

const CheckInfo = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: var(--gray-700);
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--gray-700);
  text-align: right;
  margin-right: 0;
  margin-bottom: 5px;
  border-top: 1px dotted #e0e0e0;
`;

const RoomButton = styled.div`
  width: 120px;
  background: var(--main-color);
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(237, 43, 79);
  }
`;

const Open = styled.button`
  display: flex;
  width: 100%;
  padding: 15px;
  background: rgb(253, 244, 245);
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #f03e5e;
`;

const AccommodationDescription = styled.p`
  font-size: 16px;
  color: var(--gray-700);
  line-height: 1.5;
`;

const Facility = styled.div`
  display: flex;
  font-size: 16px;
  color: var(--gray-700);
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eeeeee;
`;

const FacilityItem = styled.div`
  flex: 0 0 23%;
  min-width: 0;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &::before {
    content: '✔';
    margin-right: 7px;
  }
`;

const Refund = styled.div`
  white-space: pre-line;
  font-size: 16px;
  line-height: 1.6;
  padding-top: 10px;
`;

const Address = styled.p`
  font-size: 16px;
  color: var(--gray-700);
  margin-top: 5px;
`;

const RoomCard = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  border-radius: 8px;
  justify-content: space-between;
  padding-bottom: 30px;
`;

const RoomImage = styled.img`
  width: 90%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const RoomName = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: var(--gray-700);
  font-weight: bold;
`;

const RoomInfo = styled.div`
  margin-top: 5px;
`;

const QuotesL = styled(RiDoubleQuotesL)`
  color: var(--gray-500);
  margin: 5px 0;
  font-size: 20px;
`;

const QuotesR = styled(RiDoubleQuotesR)`
  color: var(--gray-500);
  margin-top: 10px;
  font-size: 20px;
`;

const Queen = styled(GiChessQueen)`
  color: var(--gray-700);
  font-size: 50px;
`;

const ReviewContent = styled.div`
  width: 300px;
  font-size: 1rem;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewText = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const ReviewCard = styled.div`
  padding: 12px;
  border-radius: 15px;
  width: 500px;
  margin-right: 20px;
  background: #f5f5f5;
`;

const ReviewContainer = styled.div`
  display: flex;
  border-radius: 8px;
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 10px;
  overflow-x: auto;
  white-space: nowrap;
`;

const ReviewDate = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: var(--gray-700);
  padding-right: 5px;
`;

const Text = styled.span`
  margin-left: 8px;
  padding: 0px 10px;
  border-radius: 20px;
  color: white;
  background: #ff7b92;
`;

const Section = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 15px;
`;

const SeeAllButton = styled.button`
  color: var(--gray-600);
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 5px;
`;

const Detail = styled.button`
  color: var(--gray-600);
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin: 3px;
`;
