import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
  SearchBarWrapper,
  InputWrapper,
  SearchButton,
  Button,
  PeopleDropdown,
  Input,
  LocationDropdown,
  DropdownItem,
  DatePickerWrapper,
  Container,
  CheckWrapper,
  BoxWrapper,
  Label,
  NumberInputWrapper,
  TextInput,
  ApplyButton,
} from '@components/common/SearchBar/styles';

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
  const navigate = useNavigate();
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

  const handleFocus = () => {
    if (!location) {
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

  const handlePeopleCountChange = (operation: 'increment' | 'decrement') => {
    setPeopleCount((prevCount) => {
      if (operation === 'increment') {
        return prevCount + 1;
      } else if (operation === 'decrement') {
        return prevCount > 1 ? prevCount - 1 : 1;
      }
      return prevCount;
    });
  };

  const handlePetCountChange = (operation: 'increment' | 'decrement') => {
    setPetCount((prevCount) => {
      if (operation === 'increment') {
        return prevCount + 1;
      } else if (operation === 'decrement') {
        return prevCount > 1 ? prevCount - 1 : 1;
      }
      return prevCount;
    });
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

    const url = `/search?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleCount=${peopleCount}&petCount=${petCount}&location=${location}`;
    navigate(url);
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
          onFocus={handleFocus}
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
                  <Label>인원</Label>
                  <Button onClick={() => handlePeopleCountChange('decrement')}>
                    -
                  </Button>
                  <TextInput type="text" value={peopleCount} readOnly />
                  <Button onClick={() => handlePeopleCountChange('increment')}>
                    +
                  </Button>
                </NumberInputWrapper>
              </DropdownItem>

              <DropdownItem>
                {/* 반려동물 수 입력 */}
                <NumberInputWrapper>
                  <Label>반려동물</Label>
                  <Button onClick={() => handlePetCountChange('decrement')}>
                    -
                  </Button>
                  <TextInput type="text" value={petCount} readOnly />
                  <Button onClick={() => handlePetCountChange('increment')}>
                    +
                  </Button>
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
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;
