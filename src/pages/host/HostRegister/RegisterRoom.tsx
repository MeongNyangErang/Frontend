import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useHostRegister from '@hooks/page/useHostRegister';
import Header from '@components/common/RegisterHeader/index';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { fetchCall } from 'services/api';
import { useNavigate } from 'react-router-dom';
import {
  SFieldset,
  SOptionSelectorWrapper,
  SButton,
  SLabel,
  SInput,
  SLabelFile,
  SDescriptionWrapper,
  SInputExplain,
  SCharacterCount,
  SImagePreviewWrapper,
  SInputFile,
  SFormItem,
  SInputNumber,
  SFormContainer,
  SErrorMessage,
  SSUploadContainer,
} from '@pages/host/HostRegister/styles';
import ROUTES from '@constants/routes';

interface ButtonProps {
  selected: boolean;
}

interface RoomResponse {
  roomId: string;
  name: string;
  description: string | null;
  thumbnailUrl: string | null;
  facilityTypes: string[];
  petFacilityTypes: string[];
  hashtagTypes: string[];
  price: number;
  extraFee: number;
  extraPeopleFee: number;
  extraPetFee: number;
  standardPeopleCount: number;
  maxPeopleCount: number;
  standardPetCount: number;
  maxPetCount: number;
  checkInTime: string;
  checkOutTime: string;
}

const facility = [
  '스타일러',
  '냉장고',
  '전기밥솥',
  '샤워실',
  '에어컨',
  'TV',
  '와이파이',
  '용실 용품',
  '드라이기',
  '바비큐',
  '객실 내 취사',
];
const petFacility = [
  '식기',
  '배변용품',
  '장난감',
  '침대',
  '캣 타워',
  '미끄럼 방지 바닥',
  '펜스 설치 공간',
  '캣 휠',
  '그루밍 브러쉬',
  '강아지 계단',
];
const hashTag = [
  '가족여행',
  '스파',
  '오션뷰',
  '파티룸',
  '아늑한',
  '모던한',
  '금연숙소',
  '포레스트뷰',
  '감성숙소',
];

const HASHTAG_TYPE_MAP = {
  가족여행: 'FAMILY_TRIP',
  스파: 'SPA',
  오션뷰: 'OCEAN_VIEW',
  포레스트뷰: 'FOREST_VIEW',
  아늑한: 'COZY',
  금연숙소: 'NO_SMOKING',
  모던한: 'MODERN',
  파티룸: 'PARTY_ROOM',
  감성숙소: 'EMOTIONAL',
};

const ROOM_FACILITY_TYPE_MAP = {
  스타일러: 'STYLER',
  냉장고: 'REFRIGERATOR',
  전기밥솥: 'RICE_COOKER',
  샤워실: 'SHOWER_ROOM',
  에어컨: 'AIR_CONDITIONER',
  TV: 'TV',
  와이파이: 'WIFI',
  욕실용품: 'BATHROOM_SUPPLIES',
  드라이기: 'DRYER',
  바비큐: 'BARBECUE',
  '객실 내 취사': 'POSSIBLE_COOK_IN_ROOM',
};

const ROOM_PET_FACILITY_TYPE_MAP = {
  식기: 'FOOD_BOWL',
  '전용 마당': 'EXCLUSIVE_YARD',
  배변용품: 'POTTY_SUPPLIES',
  장난감: 'TOY',
  침대: 'BED',
  '미끄럼 방지 바닥': 'ANTI_SLIP_FLOOR',
  '펜스 설치 공간': 'FENCE_AREA',
  '캣 타워': 'CAT_TOWER',
  '캣 휠': 'CAT_WHEEL',
  '그루밍 브러쉬': 'BRUSH',
  '강아지 계단': 'PET_STEPS',
};

const RegisterRoom = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [prices, setPrices] = useState({
    price: '',
    extraFee: '',
    extraPeopleFee: '',
    extraPetFee: '',
  });
  const [counts, setCount] = useState({
    standardPeopleCount: '',
    maxPeopleCount: '',
    standardPetCount: '',
    maxPetCount: '',
  });
  const [thumbnailImageUploaded, setThumbnailImageUploaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [priceError, setPriceError] = useState('');
  const [peopleCountError, setPeopleCountError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [facilityError, setFacilityError] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();

  const { selectedRegister: selectedFacility, toggleRegister: selectFacility } =
    useHostRegister();
  const {
    selectedRegister: selectedPetFacility,
    toggleRegister: selectPetFacility,
  } = useHostRegister();
  const { selectedRegister: selectedHashTag, toggleRegister: selectHashTag } =
    useHostRegister();

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= 2000) {
      setDescription(e.target.value);
    }
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    priceKey: keyof typeof prices,
  ) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const isNumeric = /^\d*$/.test(rawValue);

    if (!isNumeric) {
      alert('금액은 숫자만 입력할 수 있습니다.');
      return;
    }

    const formattedValue = new Intl.NumberFormat().format(Number(rawValue));

    setPrices((prevPrices) => ({
      ...prevPrices,
      [priceKey]: formattedValue,
    }));
  };

  const handleCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof counts,
  ) => {
    const rawValue = e.target.value;

    const numericValue = Number(rawValue);
    if (!isNaN(numericValue)) {
      if (
        key === 'maxPeopleCount' &&
        numericValue < Number(counts.standardPeopleCount)
      ) {
        setCount((prevCount) => ({
          ...prevCount,
          [key]: (Number(counts.standardPeopleCount) + 1).toString(),
        }));
      } else if (
        key === 'maxPetCount' &&
        numericValue < Number(counts.standardPetCount)
      ) {
        setCount((prevCount) => ({
          ...prevCount,
          [key]: (Number(counts.standardPetCount) + 1).toString(),
        }));
      } else {
        setCount((prevCount) => ({
          ...prevCount,
          [key]: numericValue.toString(),
        }));
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const OptionSelector = ({
    options,
    selectedOptions,
    onSelect,
  }: {
    options: string[];
    selectedOptions: string[];
    onSelect: (option: string) => void;
  }) => {
    return (
      <SOptionSelectorWrapper>
        {options.map((option) => (
          <SCheckInput
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => onSelect(option)}
          >
            {option}
          </SCheckInput>
        ))}
      </SOptionSelectorWrapper>
    );
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setThumbnailImageUploaded(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !/^[가-힣a-zA-Z0-9\s]+$/.test(name)) {
      setNameError('한글, 알파벳, 숫자만 입력할 수 있습니다.');
    }

    if (!description || '') {
      setDescriptionError('설명를 입력해주세요.');
      return;
    }

    if (
      !counts.standardPeopleCount ||
      !counts.maxPeopleCount ||
      !counts.standardPetCount ||
      !counts.maxPetCount
    ) {
      setPeopleCountError('인원을 입력해주세요.');
    } else {
      setPeopleCountError('');
    }

    if (
      !prices.price ||
      !prices.extraFee ||
      !prices.extraPeopleFee ||
      !prices.extraPetFee
    ) {
      setPriceError('금액을 입력해주세요.');
    } else {
      setPriceError('');
    }

    if (!thumbnail) {
      setThumbnailError('대표 이미지를 선택해주세요.');
    }

    if (
      selectedFacility.length === 0 ||
      selectedPetFacility.length === 0 ||
      selectedHashTag.length === 0
    ) {
      setFacilityError('시설, 해시태그는 최소 1개 선택해주세요.');
      return;
    }

    if (!checkInTime || !checkOutTime) {
      setCheckError('체크인, 체크아웃을 선택해주세요.');
      return;
    }

    if (checkInTime <= checkOutTime) {
      alert('체크인은 체크아웃 시간보다 나중이어야 합니다.');
      return;
    }

    const hashtagTypes = selectedHashTag.map(
      (h) => HASHTAG_TYPE_MAP[h as keyof typeof HASHTAG_TYPE_MAP],
    );

    const facilityTypes = selectedFacility.map(
      (f) => ROOM_FACILITY_TYPE_MAP[f as keyof typeof ROOM_FACILITY_TYPE_MAP],
    );

    const petFacilityTypes = selectedPetFacility.map(
      (f) =>
        ROOM_PET_FACILITY_TYPE_MAP[
          f as keyof typeof ROOM_PET_FACILITY_TYPE_MAP
        ],
    );

    const data = {
      name,
      description,
      standardPeopleCount: counts.standardPeopleCount,
      maxPeopleCount: counts.maxPeopleCount,
      standardPetCount: counts.standardPetCount,
      maxPetCount: counts.maxPetCount,
      price: String(prices.price).replace(/,/g, ''),
      extraPeopleFee: String(prices.extraPeopleFee).replace(/,/g, ''),
      extraPetFee: String(prices.extraPetFee).replace(/,/g, ''),
      extraFee: String(prices.extraFee).replace(/,/g, ''),
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      hashtagTypes,
      facilityTypes,
      petFacilityTypes,
    } as any;

    if (roomId) data['roomId'] = roomId;

    const formData = new FormData();

    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    console.log(data, 'data');

    return;
    formData.append('request', blob);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      let response: RoomResponse;
      if (roomId) {
        response = await fetchCall(`hosts/rooms`, 'put', formData);
        alert('숙소 정보가 수정되었습니다.');
      } else {
        response = await fetchCall(`hosts/rooms`, 'post', formData);
        navigate(ROUTES.myPage.host.roomList);
      }
    } catch (error) {
      console.error('API를 불러오는데 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    const id = state?.selectedRoomId;
    if (id) {
      setRoomId(id);
    }
  }, [state]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response: RoomResponse = await fetchCall(
          `/hosts/rooms/${roomId}`,
          'get',
        );
        const room = response;
        console.log(room, 'room');
        setRoomId(room.roomId);
        setName(room.name);
        setDescription(room.description ?? '');
        setPrices({
          price: room.price.toString(),
          extraFee: room.extraFee.toString(),
          extraPeopleFee: room.extraPeopleFee.toString(),
          extraPetFee: room.extraPetFee.toString(),
        });
        setCount({
          standardPeopleCount: room.standardPeopleCount.toString(),
          maxPeopleCount: room.maxPeopleCount.toString(),
          standardPetCount: room.standardPetCount.toString(),
          maxPetCount: room.maxPetCount.toString(),
        });
        setCheckInTime(room.checkInTime);
        setCheckOutTime(room.checkOutTime);
        setThumbnailPreview(room.thumbnailUrl);
        room.facilityTypes.forEach(selectFacility);
        room.petFacilityTypes.forEach(selectPetFacility);
        room.hashtagTypes.forEach(selectHashTag);
        setRegistered(true);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    if (roomId) fetchRoomData();
  }, [roomId]);

  return (
    <form onSubmit={handleSubmit}>
      <SFieldset>
        <Header title="객실 등록" />
        <SLabel>객실명</SLabel>
        <div>
          <SInput
            type="text"
            placeholder="객실실명을 입력해주세요"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        {nameError && <SErrorMessage>{nameError}</SErrorMessage>}

        <SLabel>설명</SLabel>
        <SDescriptionWrapper>
          <SInputExplain
            placeholder="객실 설명을 작성해주세요"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={2000}
          />
          <SCharacterCount>{description.length}/2000</SCharacterCount>
        </SDescriptionWrapper>
        {descriptionError && <SErrorMessage>{descriptionError}</SErrorMessage>}

        <SLabel>체크인 - 체크아웃</SLabel>
        <SFormContainer>
          <SFormItem>
            <SInputNumber
              type="time"
              placeholder="체크인"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="time"
              placeholder="체크아웃"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </SFormItem>
        </SFormContainer>
        {checkError && <SErrorMessage>{checkError}</SErrorMessage>}

        <SLabel>인원</SLabel>
        <SFormContainer>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="기준 인원"
              value={counts.standardPeopleCount}
              onChange={(e) => handleCountChange(e, 'standardPeopleCount')}
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="최대 인원"
              value={counts.maxPeopleCount}
              onChange={(e) => handleCountChange(e, 'maxPeopleCount')}
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="기준 반려동물"
              value={counts.standardPetCount}
              onChange={(e) => handleCountChange(e, 'standardPetCount')}
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="최대 반려동물"
              value={counts.maxPetCount}
              onChange={(e) => handleCountChange(e, 'maxPetCount')}
            />
          </SFormItem>
        </SFormContainer>
        {peopleCountError && <SErrorMessage>{peopleCountError}</SErrorMessage>}

        <SLabel>추가 금액</SLabel>
        <SFormContainer>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.price}
              onChange={(e) => handleNumberChange(e, 'price')}
              placeholder="기본 금액"
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.extraFee}
              onChange={(e) => handleNumberChange(e, 'extraFee')}
              placeholder="+ 공휴일/주말 금액"
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.extraPeopleFee}
              onChange={(e) => handleNumberChange(e, 'extraPeopleFee')}
              placeholder="인원 추가 금액"
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.extraPetFee}
              onChange={(e) => handleNumberChange(e, 'extraPetFee')}
              placeholder="반려동물 추가 금액"
            />
          </SFormItem>
        </SFormContainer>
        {priceError && <SErrorMessage>{priceError}</SErrorMessage>}

        <SLabel>편의시설</SLabel>
        <OptionSelector
          options={facility}
          selectedOptions={selectedFacility}
          onSelect={selectFacility}
        />

        <SLabel>반려동물 편의시설</SLabel>
        <OptionSelector
          options={petFacility}
          selectedOptions={selectedPetFacility}
          onSelect={selectPetFacility}
        />

        <SLabel>해시태그</SLabel>
        <OptionSelector
          options={hashTag}
          selectedOptions={selectedHashTag}
          onSelect={selectHashTag}
        />
        {facilityError && <SErrorMessage>{facilityError}</SErrorMessage>}

        <SLabelFile>대표 이미지</SLabelFile>
        {!thumbnailImageUploaded && (
          <SSUploadContainer htmlFor="thumbnail-upload">
            <UploadIcon />
            이미지 업로드
          </SSUploadContainer>
        )}
        <SInputFile
          id="thumbnail-upload"
          type="file"
          onChange={handleThumbnailChange}
          accept="image/jpeg,image/jpg,image/png"
        />
        {thumbnailPreview && (
          <SImagePreviewWrapper>
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
          </SImagePreviewWrapper>
        )}
        {thumbnailError && <SErrorMessage>{thumbnailError}</SErrorMessage>}

        <SButton type="submit">{registered ? '수정하기' : '등록하기'}</SButton>
      </SFieldset>
    </form>
  );
};

export default RegisterRoom;

const SCheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: ${(props) => (props.selected ? '#f03e5e' : '#757575')};
  padding: 7px 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 20px;
`;

const UploadIcon = styled(IoCloudUploadOutline)`
  font-size: 30px;
  color: var(--gray-600);
  margin-bottom: 5px;
`;
