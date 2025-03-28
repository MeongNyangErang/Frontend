import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [petCount, setPetCount] = useState(1);
  const [LocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [PeopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
  const [peopleLabel, setPeopleLabel] = useState('인원');
  const [petLabel, setPetLabel] = useState('반려동물');

  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const peopleDropdownRef = useRef<HTMLDivElement | null>(null);
  const locationDropdownRef = useRef<HTMLDivElement | null>(null);

  const locations = [
    '서울',
    '제주',
    '부산',
    '인천',
    '여수',
    '강릉',
    '속초',
    '평창',
    '전주',
    '대구',
    '경주',
    '가평',
  ];

  const handleLocationChange = (e: any) => {
    setLocation(e.target.value);
    if (e.target.value === '') {
      setLocationDropdownOpen(false);
    } else {
      setLocationDropdownOpen(true);
    }
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setLocationDropdownOpen(false);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setLocationDropdownOpen(false);
  };

  const handlePeopleCountChange = (e: any) => {
    const count = Number(e.target.value);
    setPeopleCount(count);
  };

  const handlePetCountChange = (e: any) => {
    const count = Number(e.target.value);
    setPetCount(count);
  };

  const handleSearch = async () => {
    const validations = [
      { condition: !location, message: '여행지를 입력해주세요.' },
      { condition: !checkInDate, message: '체크인 날짜를 선택해주세요.' },
      { condition: !checkOutDate, message: '체크아웃 날짜를 선택해주세요.' },
      { condition: peopleCount <= 0, message: '인원 수를 입력해주세요.' },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        alert(validation.message);
        return;
      }
    }

    const formattedCheckInDate = checkInDate?.toISOString().split('T')[0];
    const formattedCheckOutDate = checkOutDate?.toISOString().split('T')[0];

    try {
      const response = await axios.post('/api/v1/users/accommodations/search', {
        location,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        peopleCount,
        petCount,
      });

      if (response.status === 200) {
        console.log(response.data.data.content);
      } else {
        alert('API 요청에 실패했습니다.');
        console.log('API 요청에 실패했습니다');
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      console.log('Search finished');
    }
  };

  const handlePeopleToggle = () => {
    setPeopleDropdownOpen(!PeopleDropdownOpen);
    if (!PeopleDropdownOpen) {
      setLocationDropdownOpen(false);
    }
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);
  };

  const applyPeopleAndPets = () => {
    setPeopleLabel(`인원 ${peopleCount}`);
    setPetLabel(`반려동물 ${petCount}`);
    setPeopleDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node) &&
        peopleDropdownRef.current &&
        !peopleDropdownRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setLocationDropdownOpen(false);
        setPeopleDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <SearchBarWrapper>
      {/* 여행지 검색 */}
      <InputWrapper>
        <Input
          ref={locationInputRef}
          type="text"
          value={location}
          onChange={handleLocationChange}
          onKeyDown={handleLocationKeyDown}
          placeholder="여행지를 검색해보세요"
        />
        {LocationDropdownOpen && (
          <LocationDropdown ref={locationDropdownRef}>
            {locations.map((location, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleLocationSelect(location)}
              >
                {location}
              </DropdownItem>
            ))}
          </LocationDropdown>
        )}
      </InputWrapper>

      {/* 체크인/체크아웃 */}
      <Container>
        <CheckWrapper>
          <DatePickerWrapper>
            <DatePicker
              selected={checkInDate}
              onChange={handleDateChange}
              placeholderText="날짜 선택"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              selectsRange
              startDate={checkInDate}
              endDate={checkOutDate}
            />
          </DatePickerWrapper>
        </CheckWrapper>

        <BoxWrapper>
          <Label onClick={handlePeopleToggle}>
            {peopleLabel}&nbsp;&nbsp;{petLabel}
          </Label>
          {PeopleDropdownOpen && (
            <PeopleDropdown ref={peopleDropdownRef}>
              <DropdownItem>
                <NumberInputWrapper>
                  <label>인원</label>
                  <NumberInput
                    type="number"
                    value={peopleCount}
                    onChange={handlePeopleCountChange}
                    min="1"
                  />
                </NumberInputWrapper>
              </DropdownItem>

              <DropdownItem>
                {/* 반려동물 수 입력 */}
                <NumberInputWrapper>
                  <label>반려동물</label>
                  <NumberInput
                    type="number"
                    value={petCount}
                    onChange={handlePetCountChange}
                    min="1"
                  />
                </NumberInputWrapper>
              </DropdownItem>
              <DropdownItem>
                <ApplyButton onClick={applyPeopleAndPets}>완료</ApplyButton>
              </DropdownItem>
            </PeopleDropdown>
          )}
        </BoxWrapper>
      </Container>

      {/* 검색 버튼 */}
      <Button onClick={handleSearch}>검색</Button>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  gap: 2px;
  width: 100%;
  padding: 5px;
  flex-direction: column;
  color: #888;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const NumberInputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px 10px 0 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const LocationDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const PeopleDropdown = styled.div`
  position: absolute;
  top: 148px;
  left: 240px;
  width: 48%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const DropdownItem = styled.div`
  margin: 5px 5px;
  padding: 5px;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

const NumberInput = styled.input`
  margin-left: 30px;
  width: 60px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const DatePickerWrapper = styled.div`
  width: 70px;
  position: relative;
`;

const Button = styled.button`
  padding: 10px;
  background-color: rgb(252, 109, 135);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: var(--main-color);
  }
`;

const CheckWrapper = styled.div`
  width: 50%;
  display: flex;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 0 0px 10px;
`;

const BoxWrapper = styled.div`
  width: 50%;
  display: flex;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 0px;
  font-family: 'Noto Sans KR';
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3px;
  margin-bottom: 5px;
`;

const ApplyButton = styled.button`
  padding: 5px;
  border: 1px solid rgb(255, 157, 77);
  border-radius: 4px;
  cursor: pointer;
  width: 95%;
  text-align: center;
`;
