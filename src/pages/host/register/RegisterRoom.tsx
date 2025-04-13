import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHostRegister from '@hooks/page/useHostRegister';
import axios from 'axios';
import Header from '@components/common/RegisterHeader/index';
import { IoCloudUploadOutline } from 'react-icons/io5';
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
} from './styles';

interface ButtonProps {
  selected: boolean;
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
  '배변 용품',
  '장난감',
  '침대',
  '드라이룸',
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
  '풀빌라',
  '오션뷰',
  '파티룸',
  '아늑한',
  '모던한',
  '금연숙소',
  '프레스트뷰',
  '감성숙소',
];

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
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [thumbnailImageUploaded, setThumbnailImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [priceError, setPriceError] = useState('');
  const [peopleCountError, setPeopleCountError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');
  const [registered, setRegistered] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    const isNumeric = /^\d*$/.test(rawValue);

    if (!isNumeric) {
      alert('숫자만 입력할 수 있습니다.');
      return;
    }

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
    const regex = /^[a-zA-Z0-9가-힣()]*$/;
    if (regex.test(newName)) {
      setName(newName);
      setErrorMessage('');
    } else {
      setErrorMessage('한글, 알파벳, 숫자만 입력할 수 있습니다.');
    }
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
    } else {
      setThumbnailError('');
    }

    if (
      selectedFacility.length === 0 ||
      selectedPetFacility.length === 0 ||
      selectedHashTag.length === 0
    ) {
      alert('시설, 해시태그는 최소 1개 선택해주세요.');
      return;
    }

    if (!name || !description) {
      alert('객실 정보를 입력해주세요.');
      return;
    }

    if (!checkInTime || !checkOutTime) {
      alert('체크인, 체크아웃을 선택해주세요.');
      return;
    }

    if (checkInTime <= checkOutTime) {
      alert('체크인은 체크아웃 시간보다 나중이어야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('standardPeopleCount', counts.standardPeopleCount);
    formData.append('maxPeopleCount', counts.maxPeopleCount);
    formData.append('standardPetCount', counts.standardPetCount);
    formData.append('maxPetCount', counts.maxPetCount);
    formData.append('facilityTypes', JSON.stringify(selectedFacility));
    formData.append('petFacilityTypes', JSON.stringify(selectedPetFacility));
    formData.append('hashTagTypes', JSON.stringify(selectedHashTag));
    formData.append(
      'extraPeopleFee',
      String(prices.extraPeopleFee).replace(/,/g, ''),
    );
    formData.append(
      'extraPetFee',
      String(prices.extraPetFee).replace(/,/g, ''),
    );
    formData.append('extraFee', String(prices.extraFee).replace(/,/g, ''));
    formData.append('price', String(prices.price).replace(/,/g, ''));
    formData.append('checkInTime', checkInTime || '');
    formData.append('checkOutTime', checkOutTime || '');

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      let response;
      if (roomId) {
        response = await axios.put(`${BASE_URL}/register/room`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response?.status === 200) {
          alert('숙소 정보가 수정되었습니다.');
        }
      } else {
        response = await axios.post(`${BASE_URL}/register/room`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response?.status === 200) {
          alert('숙소 정보가 등록되었습니다.');
          setRoomId(response.data.id);
        }
      }
    } catch (error) {
      console.error('API를 불러오는데 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/register/room`);
        console.log(response);
        if (response.data) {
          const room = response.data;
          setRoomId(room.id);
          setName(room.name);
          setDescription(room.description);
          setPrices({
            price: room.price,
            extraFee: room.extraFee,
            extraPeopleFee: room.extraPeopleFee,
            extraPetFee: room.extraPetFee,
          });
          setCount({
            standardPeopleCount: room.standardPeopleCount,
            maxPeopleCount: room.maxPeopleCount,
            standardPetCount: room.standardPetCount,
            maxPetCount: room.maxPetCount,
          });
          setCheckInTime(room.checkInTime);
          setCheckOutTime(room.checkOutTime);
          setThumbnailPreview(room.thumbnail);
          selectFacility(room.facilityTypes || []);
          selectPetFacility(room.petFacilityTypes || []);
          selectHashTag(room.hashTagTypes || []);
          setRegistered(true);
        }
      } catch (error) {
        console.error('Failed to fetch room data:', error);
      }
    };
    if (!roomId) {
      setRegistered(false);
    } else {
      fetchRoomData();
    }
  }, [roomId]);

  return (
    <form onSubmit={handleSubmit}>
      <SFieldset>
        <Header title="객실 등록" />
        <SLabel>객실명</SLabel>
        <div>
          <SInput
            type="text"
            placeholder="숙소명을 입력해주세요"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}

        <SLabel>설명</SLabel>
        <SDescriptionWrapper>
          <SInputExplain
            placeholder="숙소 설명을 작성해주세요"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={2000}
          />
          <SCharacterCount>{description.length}/2000</SCharacterCount>
        </SDescriptionWrapper>

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
  color: var(--gray-600);
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
