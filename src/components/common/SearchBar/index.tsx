import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { locations } from '@constants/search';
import { formatDate, stringToDate } from '@utils/date';
import { SearchBaseType } from '@typings/search';
import { usePopper } from 'react-popper';
import {
  SearchBarWrapper,
  SInputBox,
  SearchButton,
  SButton,
  SPeopleDropdown,
  SInput,
  SLocationDropdown,
  SDropdownItem,
  SDatePickerWrapper,
  SContainer,
  SCheckWrapper,
  SBoxWrapper,
  SLabel,
  SNumberInputWrapper,
  STextInput,
  SApplyButton,
} from './styles';

import Modal from '../Modal';

interface Props {
  currentQuery?: SearchBaseType;
}

const SearchBar = ({ currentQuery }: Props) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [petCount, setPetCount] = useState(1);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [peopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
  const peopleDropdownRef = useRef<HTMLDivElement | null>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [selectionDone, setSelectionDone] = useState(false);

  const navigate = useNavigate();

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const resetError = () => {
    setError('');
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (locationDropdownOpen) setLocationDropdownOpen(false);
    setLocation(e.target.value);
  };

  const handleLocationSelect = (
    selectedLocation: (typeof locations)[number],
  ) => {
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
      { condition: petCount < 1, message: '반려동물 수를 입력해주세요.' },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        setError(validation.message);
        return;
      }
    }

    const params = new URLSearchParams({
      checkInDate: formatDate(checkInDate!),
      checkOutDate: formatDate(checkOutDate!),
      peopleCount: String(peopleCount),
      petCount: String(petCount),
      location: location,
    });

    const url = `/search?${params.toString()}`;
    navigate(url);
  };

  const handlePeopleToggle = () => {
    setPeopleDropdownOpen(!peopleDropdownOpen);
    if (!peopleDropdownOpen) {
      setLocationDropdownOpen(false);
    }
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);
  };

  const applyPeopleAndPets = () => {
    setPeopleDropdownOpen(false);
    setSelectionDone(true);
  };

  useEffect(() => {
    if (currentQuery) {
      const { peopleCount, petCount, checkInDate, checkOutDate, location } =
        currentQuery;
      setCheckInDate(stringToDate(checkInDate) || null);
      setCheckOutDate(stringToDate(checkOutDate) || null);
      setLocation(location || '');
      setPetCount(parseFloat(petCount) || 1);
      setPeopleCount(parseFloat(peopleCount) || 1);
    }
  }, [currentQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const clickedInsideLocationDropdown =
        locationDropdownRef.current?.contains(target);
      const clickedInsidePeopleDropdown =
        peopleDropdownRef.current?.contains(target);

      const clickedInputOrLabel =
        target.closest('input') || target.closest('label');

      if (
        !clickedInsideLocationDropdown &&
        !clickedInsidePeopleDropdown &&
        !clickedInputOrLabel
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
    <>
      <SearchBarWrapper>
        {/* 여행지 검색 */}
        <SInputBox>
          <SInput
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="여행지를 검색해보세요"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
          />

          {locationDropdownOpen && (
            <SLocationDropdown ref={locationDropdownRef}>
              {locations.map((location, index) => (
                <SDropdownItem
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </SDropdownItem>
              ))}
            </SLocationDropdown>
          )}
        </SInputBox>

        {/* 체크인/체크아웃 */}
        <SContainer>
          <SCheckWrapper>
            <SDatePickerWrapper>
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
            </SDatePickerWrapper>
          </SCheckWrapper>

          <SBoxWrapper>
            <SLabel
              onClick={handlePeopleToggle}
              ref={setReferenceElement}
              style={{ color: selectionDone ? '#424242' : '#888' }}
            >
              인원 {peopleCount}&nbsp;&nbsp;반려동물 {petCount}
            </SLabel>

            {peopleDropdownOpen && (
              <SPeopleDropdown
                ref={(el) => {
                  setPopperElement(el);
                  peopleDropdownRef.current = el;
                }}
                style={styles.popper}
                {...attributes.popper}
              >
                <SDropdownItem>
                  <SNumberInputWrapper>
                    <SLabel>인원</SLabel>
                    <div>
                      <SButton
                        onClick={() => handlePeopleCountChange('decrement')}
                      >
                        -
                      </SButton>
                      <STextInput type="text" value={peopleCount} readOnly />
                      <SButton
                        onClick={() => handlePeopleCountChange('increment')}
                      >
                        +
                      </SButton>
                    </div>
                  </SNumberInputWrapper>
                </SDropdownItem>

                <SDropdownItem>
                  {/* 반려동물 수 입력 */}
                  <SNumberInputWrapper>
                    <SLabel>반려동물</SLabel>
                    <div>
                      <SButton
                        onClick={() => handlePetCountChange('decrement')}
                      >
                        -
                      </SButton>
                      <STextInput type="text" value={petCount} readOnly />
                      <SButton
                        onClick={() => handlePetCountChange('increment')}
                      >
                        +
                      </SButton>
                    </div>
                  </SNumberInputWrapper>
                </SDropdownItem>
                <SDropdownItem>
                  <SApplyButton onClick={applyPeopleAndPets}>완료</SApplyButton>
                </SDropdownItem>
              </SPeopleDropdown>
            )}
          </SBoxWrapper>
        </SContainer>

        {/* 검색 버튼 */}
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchBarWrapper>
      <Modal
        isOpen={!!error}
        onClose={resetError}
        closeType="none"
        variant="centered"
        role="alert"
      >
        {error}
      </Modal>
    </>
  );
};

export default SearchBar;
