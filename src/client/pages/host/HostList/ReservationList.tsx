import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa';
import Header from '@components/common/RegisterHeader/index';
import { fetchCall } from '@shared/services/api';

interface ReservationList {
  reservationId: string;
  reservationDate: string;
  reservationName: string;
  reservatioPhoneNumber: string;
  peopleCount: number;
  petCount: number;
  hasVehicle: boolean;
  totalPrice: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

const FILTER = ['RESERVED', 'COMPLETED', 'CANCELED'] as const;

const ReservationList = () => {
  const [reservationList, setReservationList] = useState<ReservationList[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(FILTER[0]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [size, setSize] = useState<number>(20);

  const fetchRooms = async (force: boolean = false) => {
    if (!hasMore && !force) return;

    try {
      const response = (await fetchCall(
        `hosts/reservations?status=${selectedFilter}&page=${page}&size=${size}`,
        'get',
      )) as any;

      setReservationList((prev) => [...prev, ...response.content]);
      setTotalPages(response.totalPages);

      if (page < response.totalPages - 1) {
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('예약 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      const response = (await fetchCall(
        `hosts/reservations/${reservationId}/cancel`,
        'put',
      )) as any;

      if (response.status === 'CANCELED') {
        setReservationList((prevList) =>
          prevList.map((reservation) =>
            reservation.reservationId === reservationId
              ? { ...reservation, status: 'CANCELED' }
              : reservation,
          ),
        );
      }
    } catch (error) {
      console.error('예약 취소에 실패했습니다:', error);
    }
  };

  const handleScroll = () => {
    const isBottom =
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
      document.documentElement.offsetHeight;

    if (isBottom && hasMore) {
      fetchRooms();
    }
  };

  useEffect(() => {
    setReservationList([]);
    setPage(0);
    setHasMore(true);
    fetchRooms(true);
  }, [selectedFilter]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore]);

  const handleFilterClick = (filter: string) => {
    if (selectedFilter !== filter) setSelectedFilter(filter);
  };

  return (
    <Containers>
      <Header title="예약 목록" />
      <FilterButtons>
        <FilterButton
          selected={selectedFilter === 'RESERVED'}
          onClick={() => handleFilterClick('RESERVED')}
        >
          이용 전
        </FilterButton>
        <FilterButton
          selected={selectedFilter === 'COMPLETED'}
          onClick={() => handleFilterClick('COMPLETED')}
        >
          이용 완료
        </FilterButton>
        <FilterButton
          selected={selectedFilter === 'CANCELED'}
          onClick={() => handleFilterClick('CANCELED')}
        >
          취소됨
        </FilterButton>
      </FilterButtons>

      {reservationList.length === 0 && (
        <NoRoomsMessage>예약 내역이 없습니다.</NoRoomsMessage>
      )}

      {reservationList.map((reservation) => (
        <RoomDetails key={reservation.reservationId}>
          <Date>
            <Label>예약한 날짜</Label>| {reservation.reservationDate}
          </Date>

          <Width>
            <Info>{reservation.reservationName}</Info>
            <Info>{reservation.reservatioPhoneNumber}</Info>

            <Count>
              인원 {reservation.peopleCount}명 / 반려동물 {reservation.petCount}
              마리
            </Count>

            <Side>
              <Count>차량 {reservation.hasVehicle ? '있음' : '없음'}</Count>
              <Price>
                <Total>가격</Total>
                {reservation.totalPrice.toLocaleString()}원
              </Price>
            </Side>

            <Side>
              <Check>
                <Calendar /> {reservation.checkInDate} ~ <Calendar />{' '}
                {reservation.checkOutDate}
              </Check>

              {selectedFilter === 'RESERVED' && false && (
                <CancelButton
                  isDoneFilter={false}
                  onClick={() =>
                    handleCancelReservation(reservation.reservationId)
                  }
                >
                  예약 취소
                </CancelButton>
              )}
            </Side>
          </Width>
        </RoomDetails>
      ))}
    </Containers>
  );
};

export default ReservationList;

const Containers = styled.div`
  font-family: 'Noto Sans KR';
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const RoomDetails = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Width = styled.div`
  padding: 7px 16px 14px 16px;
`;

const FilterButtons = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 12px 10px;
  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: none;
  border: none;
  border-bottom: ${({ selected }) =>
    selected ? '4px solid #f03e5e' : '4px solid transparent'};
  color: ${({ selected, disabled }) =>
    disabled ? '#ccc' : selected ? '#f03e5e' : 'inherit'};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  transition: all 0.2s;
`;

const CancelButton = styled.button<{ isDoneFilter: boolean }>`
  padding: 7px 30px;
  margin-top: 10px;
  border: 1px solid ${({ isDoneFilter }) => (isDoneFilter ? '#ccc' : '#f03e5e')};
  border-radius: 10px;
  color: ${({ isDoneFilter }) => (isDoneFilter ? '#999' : '#f03e5e')};
  background-color: ${({ isDoneFilter }) =>
    isDoneFilter ? '#f2f2f2' : 'transparent'};
  font-weight: bold;
  cursor: ${({ isDoneFilter }) => (isDoneFilter ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ isDoneFilter }) =>
      isDoneFilter ? '#f2f2f2' : '#f03e5e'};
    color: ${({ isDoneFilter }) => (isDoneFilter ? '#999' : '#fff')};
  }
`;

const NoRoomsMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: var(--gray-700);
`;

const Label = styled.span`
  margin-right: 5px;
  font-size: 18px;
`;

const Count = styled.p`
  color: var(--gray-600);
  margin-top: 4px;
  font-size: 16px;
`;

const Check = styled.p`
  color: var(--gray-600);
  font-size: 16px;
  margin-top: 10px;
`;

const Total = styled.span`
  margin-right: 5px;
  color: var(--gray-600);
  font-size: 16px;
`;

const Info = styled.p`
  color: var(--gray-600);
  margin-top: 3px;
  font-size: 16px;
  font-weight: bold;
`;

const Price = styled.span`
  font-size: 20px;
  color: var(--gray-800);
  font-weight: bold;
`;

const Date = styled.p`
  font-size: 16px;
  color: var(--gray-600);
  padding: 14px;
  background: #f5f5f5;
`;

const Calendar = styled(FaCalendarAlt)`
  color: var(--gray-600);
  margin-top: 5px;
`;

const Side = styled.div`
  display: flex;
  justify-content: space-between;
`;
