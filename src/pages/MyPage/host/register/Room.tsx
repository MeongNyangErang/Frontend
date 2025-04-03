import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useRegister from '@hooks/page/useRegister';
import axios from 'axios';

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
  '빗',
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

const Room = () => {
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

  const { selectedRegister: selectedFacility, toggleRegister: selectFacility } =
    useRegister<string>();
  const {
    selectedRegister: selectedPetFacility,
    toggleRegister: selectPetFacility,
  } = useRegister<string>();
  const { selectedRegister: selectedHashTag, toggleRegister: selectHashTag } =
    useRegister<string>();

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
    setName(e.target.value);
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
      <OptionSelectorWrapper>
        {options.map((option) => (
          <CheckInput
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => onSelect(option)}
          >
            {option}
          </CheckInput>
        ))}
      </OptionSelectorWrapper>
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
      /* 
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
      */
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset>
        <Label>객실명</Label>
        <Input
          type="text"
          placeholder="숙소명을 입력해주세요"
          value={name}
          onChange={handleNameChange}
        />

        <Label>설명</Label>
        <DescriptionWrapper>
          <InputExplain
            placeholder="숙소 설명을 작성해주세요"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={2000}
          />
          <CharacterCount>{description.length}/2000</CharacterCount>
        </DescriptionWrapper>

        <Label>체크인 - 체크아웃</Label>
        <FormContainer>
          <FormItem>
            <InputNumber
              type="time"
              placeholder="체크인"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="time"
              placeholder="체크아웃"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </FormItem>
        </FormContainer>

        <Label>인원</Label>
        <FormContainer>
          <FormItem>
            <InputNumber
              type="number"
              required
              placeholder="기준 인원"
              min="1"
              max="5"
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="number"
              required
              placeholder="최대 인원"
              max="10"
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="number"
              required
              placeholder="기준 반려동물"
              min="1"
              max="5"
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="number"
              required
              placeholder="최대 반려동물"
              max="10"
            />
          </FormItem>
        </FormContainer>

        <Label>추가 금액</Label>
        <FormContainer>
          <FormItem>
            <InputNumber
              type="text"
              value={prices.price}
              onChange={(e) => handleNumberChange(e, 'price')}
              placeholder="기본 금액"
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="text"
              value={prices.extraFee}
              onChange={(e) => handleNumberChange(e, 'extraFee')}
              placeholder="+ 공휴일/주말 금액"
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="text"
              value={prices.extraPeopleFee}
              onChange={(e) => handleNumberChange(e, 'extraPeopleFee')}
              placeholder="인원 추가 금액"
            />
          </FormItem>
          <FormItem>
            <InputNumber
              type="text"
              value={prices.extraPetFee}
              onChange={(e) => handleNumberChange(e, 'extraPetFee')}
              placeholder="반려동물 추가 금액"
            />
          </FormItem>
        </FormContainer>

        <Label>편의시설</Label>
        <OptionSelector
          options={facility}
          selectedOptions={selectedFacility}
          onSelect={selectFacility}
        />

        <Label>반려동물 편의시설</Label>
        <OptionSelector
          options={petFacility}
          selectedOptions={selectedPetFacility}
          onSelect={selectPetFacility}
        />

        <Label>해시태그</Label>
        <OptionSelector
          options={hashTag}
          selectedOptions={selectedHashTag}
          onSelect={selectHashTag}
        />

        <LabelFile>대표이미지</LabelFile>
        <InputFile
          type="file"
          onChange={handleThumbnailChange}
          accept="image/jpeg,image/jpg,image/png"
        />
        {thumbnailPreview && (
          <ImagePreviewWrapper>
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
          </ImagePreviewWrapper>
        )}

        <Button type="submit">등록하기</Button>
      </Fieldset>
    </form>
  );
};

export default Room;

const Fieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
  display: flex;
  flex-direction: column;
`;

const OptionSelectorWrapper = styled.div`
  margin-bottom: 8px;
`;

// 선택 버튼
const CheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: black;
  padding: 7px 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 20px;
`;

const Label = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin: 10px 0;
`;

const LabelFile = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const Input = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const DescriptionWrapper = styled.div`
  position: relative;
`;

const InputExplain = styled.textarea`
  font-family: 'Noto Sans KR';
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  overflow-y: auto;
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.875rem;
  color: #6b7280;
`;

const Button = styled.button`
  background-color: var(--sub-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  &:hover {
    background-color: var(--sub-color);
    border: 1px solid #f03e5e;
  }
`;

const ImagePreviewWrapper = styled.div`
  margin-top: 10px;
  width: 50%;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const InputFile = styled.input`
  border: 1px solid #ccc;
  width: 60%;
  padding: 2px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
`;

const InputNumber = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`;
