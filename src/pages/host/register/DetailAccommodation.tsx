import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import { GiChessQueen } from 'react-icons/gi';
import StarRatings from 'react-star-ratings';

interface DetailData {
  accommodationId: number;
  name: string;
  description: string;
  address: string;
  detailedAddress: string;
  type: string;
  thumbnailUrl: string;
  accommodationImages: string[];
  totalRating: string;
  accommodationFacility: string[];
  accommodationPetFacility: string[];
  allowPet: string[];
  latitude: number;
  longitude: number;
  review: ReviewData[];
  rooms: RoomData[];
}

interface RoomData {
  roomId: number;
  roomName: string;
  roomImageUrl: string[];
  price: number;
  standardPeople: number;
  maxPeople: number;
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
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getAccommodationDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/register/detailAccommodation`,
        );
        console.log(response.data);
        if (response.status === 200) {
          const accommodationData = response.data.detailAccommodationData;

          const sortedReviews = accommodationData.review.sort(
            (a: ReviewData, b: ReviewData) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            },
          );

          setAccommodation({
            ...response.data.detailAccommodationData,
            review: sortedReviews,
          });
        }
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

  return (
    <Container>
      {accommodation && (
        <>
          <TumbnailImage src={accommodation.thumbnailUrl} />
          <Content>
            <AccommodationName>
              {accommodation.name}
              <Text>{accommodation.totalRating}</Text>
            </AccommodationName>

            <Title>{accommodation.type}</Title>
            <Title>{accommodation.allowPet}</Title>

            <Section>
              <All>
                <Real>리얼 리뷰</Real>
                <SeeAllButton onClick={() => {}}>전체보기</SeeAllButton>
              </All>
              {accommodation.review && accommodation.review.length > 0 ? (
                <ReviewContainer>
                  {accommodation.review.map((review, index) => (
                    <ReviewCard key={`review-${review.reviewId}-${index}`}>
                      <All>
                        <ReviewRatingWrapper>
                          <StarRatings
                            rating={review.reviewRating}
                            starRatedColor="#ffc107"
                            numberOfStars={5}
                            name="rating"
                            starDimension="20px"
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
            {accommodation.rooms && accommodation.rooms.length > 0 ? (
              <RoomContainer>
                {accommodation.rooms.map((room) => (
                  <RoomCard key={room.roomId}>
                    <RoomInfoLeft>
                      <RoomImage
                        src={
                          room.roomImageUrl && room.roomImageUrl.length > 0
                            ? room.roomImageUrl[0]
                            : 'default-room-image.jpg'
                        }
                        alt={room.roomName}
                      />
                      <RoomName>{room.roomName}</RoomName>
                      <RoomInfo>
                        <Count>
                          인원 {room.standardPeople}명 / 최대 {room.maxPeople}명
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
                        <Detail onClick={() => {}}>상세보기</Detail>
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
                        {/* <Price>{room.extraFee}</Price>
                         */}
                        <Price>{room.price.toLocaleString()}</Price>
                      </RoomInfo>
                      <RoomButton>예약하기</RoomButton>
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
            {accommodation.accommodationImages &&
            accommodation.accommodationImages.length > 0 ? (
              accommodation.accommodationImages.map((image, index) => (
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
              {accommodation.accommodationFacility.map((facility, index) => (
                <FacilityItem key={index}>{facility}</FacilityItem>
              ))}
            </Facility>
            <SectionTitle>반려동물 편의시설</SectionTitle>
            <Facility>
              {accommodation.accommodationPetFacility.map((facility, index) => (
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

            <SectionTitle>환불규정</SectionTitle>
            <Refund>
              ■ 체크인 10일 전: 100% 환불 <br />
              ■ 체크인 7일 전: 90% 환불 <br />
              ■ 체크인 5일 전: 70% 환불 <br />
              ■ 체크인 3일 전: 50% 환불 <br />
              ■ 체크인 1일 전: 20% 환불 <br />■ 체크인 당일 및 NO-SHOW: 환불불가
            </Refund>
          </Content>
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
  padding: 16px;
`;

const AccommodationImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
`;

const ImageTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  margin-top: 20px;
`;

const TumbnailImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const AccommodationName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--gray-700);
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 16px;
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
  font-size: 18px;
  color: var(--gray-700);
  font-weight: bold;
  margin-bottom: 5px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: var(--gray-700);
  font-weight: bold;
  margin-top: 20px;
  display: inline-block;
`;

const Real = styled.h3`
  font-size: 20px;
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
  height: 280px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 20px;
`;

const Count = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: var(--gray-700);
`;

const Check = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: var(--gray-700);
`;

const CheckInfo = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: var(--gray-700);
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: var(--gray-700);
  text-align: right;
  margin-right: 0;
  margin-bottom: 5px;
`;

const RoomButton = styled.div`
  width: 120px;
  background: var(--main-color);
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  padding: 15px;
  border-radius: 10px;
  margin-left: auto;
  display: flex; 
  align-items: center; 
  justify-content: center;
  &:hover{
  background:rgb(237, 43, 79);
`;

const Open = styled.button`
  display: flex;
  width: 100%;
  padding: 15px;
  background: rgb(253, 244, 245);
  justify-content: center;
  align-items: center;
  font-size: 20px;
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
  border-bottom: 1px solid #ddd;
`;

const FacilityItem = styled.div`
  flex: 0 0 23%;
  min-width: 0;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &::before {
    content: '✓';
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
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px;
  justify-content: space-between;
  padding-bottom: 30px;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const RoomName = styled.p`
  margin-top: 10px;
  font-size: 20px;
  color: var(--gray-700);
  font-weight: bold;
`;

const RoomInfo = styled.div`
  margin-top: 5px;
`;

const QuotesL = styled(RiDoubleQuotesL)`
  color: var(--gray-600);
  margin: 5px 0;
  font-size: 20px;
`;

const QuotesR = styled(RiDoubleQuotesR)`
  color: var(--gray-600);
  margin-top: 10px;
  font-size: 20px;
`;

const Queen = styled(GiChessQueen)`
  color: var(--gray-700);
  font-size: 60px;
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
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-size: 16px;
  padding-top: 5px;
`;

const ReviewCard = styled.div`
  padding: 10px;
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

const ReviewRating = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffc107;
`;
const ReviewDate = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--gray-700);
`;

const Text = styled.span`
  margin-left: 8px;
  padding: 0px 10px;
  border-radius: 20px;
  color: white;
  background: #ffc107;
`;

const Section = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 15px;
`;

const SeeAllButton = styled.button`
  color: var(--gray-600);
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin: 10px 5px;
`;

const Detail = styled.button`
  color: var(--gray-700);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin: 3px;
`;
