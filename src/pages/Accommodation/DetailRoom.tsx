import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdOutlinePets } from 'react-icons/md';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface DetailRoomData {
  name: String;
  description: String;
  standardPeopleCount: number;
  maxPeopleCount: number;
  standardPetCount: number;
  maxPetCount: number;
  price: number;
  extraPeopleFee: number;
  extraPetFee: number;
  checkInTime: String;
  checkOutTime: String;
  thumbnailUrl: string;
  FacilityTypes: [];
  PetFacilityTypes: [];
  hashtagTypes: [];
}

const DetailRoom = () => {
  const [roomDetails, setRoomDetails] = useState<DetailRoomData | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const response = await axios.get(
        `${BASE_URL}/accommodation/:accommodationId`,
      );
      setRoomDetails(response.data);
    };

    fetchRoomDetails();
  }, []);

  const handleAllReserve = () => {
    navigate('/accommodation/:accommodationId/reservation');
  };

  if (!roomDetails) return null;

  return (
    <Container>
      <RoomImage src={roomDetails.thumbnailUrl} />

      <RoomTitle>{roomDetails.name}</RoomTitle>

      <SCheckbox>
        <Check>
          <AiOutlineUser />
          {` 기준 ${roomDetails.standardPeopleCount}명 / 최대 ${roomDetails.maxPeopleCount}명`}
        </Check>
        <Check>
          <MdOutlinePets />
          {` 기준  ${roomDetails.standardPetCount}마리 / 최대 ${roomDetails.maxPetCount}마리`}
        </Check>
        <Check>
          <IoTimeOutline />
          {` 체크인: ${roomDetails.checkInTime} ~ 체크아웃: ${roomDetails.checkOutTime}`}
        </Check>
        <Fee>
          <Check>[ 1인/마리 추가 금액 ]</Check>
        </Fee>
        <Check>
          <AiOutlineUser />
          {` 1인: ${roomDetails.extraPeopleFee.toLocaleString()}원`}
        </Check>
        <Check>
          <MdOutlinePets />
          {` 1마리: ${roomDetails.extraPetFee.toLocaleString()}원`}
        </Check>

        <RoomPrice>{`${roomDetails.price.toLocaleString()}원`}</RoomPrice>
      </SCheckbox>

      <RoomDescription>{roomDetails.description}</RoomDescription>

      <Label>객실 편의시설</Label>
      <FacilityList>
        {roomDetails.FacilityTypes.map((facility, index) => (
          <FacilityItem key={index}>{facility}</FacilityItem>
        ))}
      </FacilityList>

      <Label>반려동물 편의시설</Label>
      <FacilityList>
        {roomDetails.PetFacilityTypes.map((petFacility, index) => (
          <FacilityItem key={index}>{petFacility}</FacilityItem>
        ))}
      </FacilityList>

      <Label>해시태그</Label>
      {roomDetails.hashtagTypes.length > 0 && (
        <FacilityList>
          {roomDetails.hashtagTypes.map((tag, index) => (
            <FacilityItem key={index}>{tag}</FacilityItem>
          ))}
        </FacilityList>
      )}
      <Reserve onClick={handleAllReserve}>예약하기</Reserve>
    </Container>
  );
};

export default DetailRoom;

const Container = styled.div`
  font-family: 'Noto Sans KR';
  padding: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: var(--gray-700);
`;

const SCheckbox = styled.div`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  color: var(--gray-600);
  border-radius: 12px;
  border: 1px solid #e0e0e0;
`;

const RoomTitle = styled.h1`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  color: var(--gray-700);
`;

const Check = styled.p`
  font-size: 16px;
  margin-top: 3px;
`;

const Fee = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const RoomDescription = styled.p`
  margin-top: 5px;
  font-size: 16px;
  color: var(--gray-700);
  padding-bottom: 10px;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

const FacilityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FacilityItem = styled.div`
  padding: 5px 12px;
  color: var(--gray-500);
  border: 1px solid #bdbdbd;
  border-radius: 15px;
  font-size: 14px;
`;

const RoomPrice = styled.p`
  padding: 3px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
`;

const Reserve = styled.button`
  padding: 10px;
  width: 100%;
  color: white;
  background: var(--main-color);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 25px;
  &:hover {
    background: rgb(234, 51, 85);
  }
`;
