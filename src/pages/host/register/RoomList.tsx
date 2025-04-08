import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';

interface Room {
  roomId: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  standardPeopleCount: number;
  maxPeopleCount: number;
  standardPetCount: number;
  maxPetCount: number;
}

const RoomList: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/v1/hosts/rooms');
      if (response.data.code === 200) {
        setRoomList(response.data.data.content);
      } else {
        console.log('객실을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.log('서버 오류가 발생했습니다.');
    } finally {
      console.log('객실 로딩이 완료되었습니다.');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const navigate = useNavigate();
  const openRegisterPage = () => {
    navigate('/register');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  if (roomList.length === 0) {
    return (
      <div>
        <NoRoomsMessage>등록된 객실이 없습니다</NoRoomsMessage>
        <RegisterButton onClick={openRegisterPage}>
          <Add />
          객실 등록
        </RegisterButton>
      </div>
    );
  }

  return (
    <div>
      {roomList.map((room) => (
        <HotelContainer key={room.roomId}>
          <Thumbnail src={room.thumbnailUrl} />
          <HotelInfo>
            <HotelTitle>{room.name}</HotelTitle>
            <InfoItem>{room.description}</InfoItem>
            <InfoItem>
              기준 {room.standardPeopleCount}인 / 최대 {room.maxPeopleCount}명
            </InfoItem>
            <InfoRow>
              <InfoItem>
                기준 반려동물 {room.standardPetCount}마리 / 최대{' '}
                {room.maxPetCount}
                마리
              </InfoItem>
              <InfoCharge>가격: {formatPrice(room.price)}원</InfoCharge>
            </InfoRow>
          </HotelInfo>
        </HotelContainer>
      ))}
      <RegisterButton onClick={openRegisterPage}>
        <Add />
        객실 등록
      </RegisterButton>
    </div>
  );
};

export default RoomList;

const HotelContainer = styled.div`
  font-family: 'Noto Sans KR';
  display: flex;
  margin: 20px auto;
  width: 100%;
  max-width: 760px;
  min-width: 320px;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const Thumbnail = styled.img`
  width: 450px;
  height: auto;
  object-fit: cover;
  margin-right: 20px;
`;

const HotelTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: var(--gray-700);
  margin-bottom: 5px;
`;

const HotelInfo = styled.div`
  display: grid;
  gap: 5px;
  width: 100%;
`;

const InfoItem = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--gray-600);
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoCharge = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: var(--gray-700);
  text-align: right;
  flex-shrink: 0;
`;

const NoRoomsMessage = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: var(--gray-600);
  text-align: center;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
  border-bottom: 1px solid #e0e0e0;
`;

const RegisterButton = styled.button`
  font-family: 'Noto Sans KR';
  font-size: 18px;
  font-weight: bold;
  margin: 20px auto;
  width: 100%;
  max-width: 760px;
  min-width: 320px;
  padding: 10px;
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Add = styled(IoMdAdd)`
  font-weight: bold;
  font-size: 24px;
  margin-right: 5px;
`;
