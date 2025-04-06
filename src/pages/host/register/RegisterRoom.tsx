import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHostRegister from '@hooks/page/useHostRegister';
import axios from 'axios';

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
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { selectedRegister: selectedFacility, toggleRegister: selectFacility } =
    useHostRegister<string>();
  const {
    selectedRegister: selectedPetFacility,
    toggleRegister: selectPetFacility,
  } = useHostRegister<string>();
  const { selectedRegister: selectedHashTag, toggleRegister: selectHashTag } =
    useHostRegister<string>();

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
    const formattedValue = new Intl.NumberFormat().format(Number(rawValue));

    setPrices((prevPrices) => ({
      ...prevPrices,
      [priceKey]: formattedValue,
    }));
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !checkInTime ||
      !checkOutTime ||
      !prices.price
    ) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    if (
      selectedFacility.length === 0 ||
      selectedPetFacility.length === 0 ||
      selectedHashTag.length === 0
    ) {
      alert('시설, 해시태그는 최소 1개 선택해주세요.');
      return;
    }

    if (checkInTime < checkOutTime) {
      alert('체크인은 체크인 아웃시간보다 나중이어야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('facilityTypes', JSON.stringify(selectedFacility));
    formData.append('petFacilityTypes', JSON.stringify(selectedPetFacility));
    formData.append('hashTagTypes', JSON.stringify(selectedHashTag));
    formData.append('extraPeopleFee', prices.extraPeopleFee.replace(/,/g, ''));
    formData.append('extraPetFee', prices.extraPetFee.replace(/,/g, ''));
    formData.append('extraFee', prices.extraFee.replace(/,/g, ''));
    formData.append('price', prices.price.replace(/,/g, ''));
    formData.append('checkInTime', checkInTime || '');
    formData.append('checkOutTime', checkOutTime || '');

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    console.log('=== Form Data to be Sent ===');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    {
      try {
        let response;
        response = await axios.post(
          '/api/v1/hosts/accommodations/{accommodationId}/rooms',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response?.status === 200) {
          console.log('API Response:', response.data);
        } else {
          alert('숙소 등록/수정에 실패했습니다.');
        }
      } catch (error) {
        console.error('An error occurred while making the API call:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SFieldset>
        <SLabel>객실명</SLabel>
        <div>
          <SInput
            type="text"
            placeholder="숙소명을 입력해주세요"
            value={name}
            onChange={handleNameChange}
          />
          {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
        </div>

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
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="time"
              placeholder="체크아웃"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              required
            />
          </SFormItem>
        </SFormContainer>

        <SLabel>인원</SLabel>
        <SFormContainer>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="기준 인원"
              min="1"
              max="5"
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="최대 인원"
              min="3"
              max="10"
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="기준 반려동물"
              min="1"
              max="5"
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="number"
              placeholder="최대 반려동물"
              min="3"
              max="10"
              required
            />
          </SFormItem>
        </SFormContainer>

        <SLabel>추가 금액</SLabel>
        <SFormContainer>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.price}
              onChange={(e) => handleNumberChange(e, 'price')}
              placeholder="기본 금액"
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.extraFee}
              onChange={(e) => handleNumberChange(e, 'extraFee')}
              placeholder="+ 공휴일/주말 금액"
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.extraPeopleFee}
              onChange={(e) => handleNumberChange(e, 'extraPeopleFee')}
              placeholder="인원 추가 금액"
              required
            />
          </SFormItem>
          <SFormItem>
            <SInputNumber
              type="text"
              value={prices.extraPetFee}
              onChange={(e) => handleNumberChange(e, 'extraPetFee')}
              placeholder="반려동물 추가 금액"
              required
            />
          </SFormItem>
        </SFormContainer>

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

        <SLabelFile>대표이미지</SLabelFile>
        <SInputFile
          type="file"
          onChange={handleThumbnailChange}
          accept="image/jpeg,image/jpg,image/png"
          required
        />
        {thumbnailPreview && (
          <SImagePreviewWrapper>
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
          </SImagePreviewWrapper>
        )}

        <SButton type="submit">등록하기</SButton>
      </SFieldset>
    </form>
  );
};

export default RegisterRoom;

const SCheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: black;
  padding: 7px 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 20px;
`;
