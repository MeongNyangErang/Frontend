import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import axios, { AxiosResponse } from 'axios';
import { HiEllipsisVertical } from 'react-icons/hi2';
import ROUTES from '@constants/routes';
import { fetchCall } from '@services/api';

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
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);

  const fetchRooms = async () => {
    if (!hasNext || isLoading) return;
    setIsLoading(true);
    try {
      const lastRoomId =
        roomList.length > 0 ? roomList[roomList.length - 1].roomId : '';
      const response = (await fetchCall(
        `hosts/rooms?cursorId=${lastRoomId}`,
        'get',
      )) as any;

      setRoomList(response.content);
    } catch (error) {
      console.log('서버 오류가 발생했습니다.');
    } finally {
      console.log('객실 로딩이 완료되었습니다.');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [BASE_URL]);

  const deleteRoom = async (roomId: number) => {
    try {
      await fetchCall(`hosts/rooms/${roomId}`, 'delete');
      setRoomList((prev) => prev.filter((room) => room.roomId !== roomId));
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !isLoading) {
          fetchRooms();
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef.current, hasNext, isLoading]);

  const openRegisterPage = () => {
    navigate(ROUTES.myPage.host.registerRoom);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  if (!roomList || roomList.length === 0) {
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
        <HotelContainer
          key={room.roomId}
          onClick={() =>
            navigate(ROUTES.myPage.host.registerRoom, {
              state: { selectedRoomId: room.roomId },
            })
          }
        >
          <Thumbnail src={room.thumbnailUrl} />
          <HotelInfo>
            <HeaderRow>
              <HotelTitle>{room.name}</HotelTitle>
              <DropdownWrapper>
                <MoreButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpenId(
                      dropdownOpenId === room.roomId ? null : room.roomId,
                    );
                  }}
                >
                  <HiEllipsisVertical />
                </MoreButton>
                {dropdownOpenId === room.roomId && (
                  <DropdownMenu>
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteRoom(room.roomId);
                      }}
                    >
                      삭제하기
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownWrapper>
            </HeaderRow>

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
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
  padding: 10px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Thumbnail = styled.img`
  width: 500px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
`;

const HotelTitle = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: var(--gray-700);
`;

const HotelInfo = styled.div`
  width: 100%;
`;

const InfoItem = styled.p`
  font-size: 14px;
  color: var(--gray-600);
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  margin: 0 0 10px 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoCharge = styled.p`
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
  font-size: 16px;
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

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MoreButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--gray-700);
`;

const DropdownMenu = styled.ul`
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 5px 0;
  min-width: 100px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
  padding: 5px 8px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
