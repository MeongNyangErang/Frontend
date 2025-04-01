import React, { useState } from 'react';
import styled from 'styled-components';
import useRegister from '@hooks/page/useRegister';
import RegisterAddress from 'api/RegisterAddress';

interface ButtonProps {
  selected: boolean;
}

const accommodationType = ['전체', '호텔 리조트', '독채', '풀빌라', '펜션'];
const facility = [
  '편의점',
  '공용 수영장',
  '바비큐',
  '피트니스',
  '노래방',
  '와이파이',
  '무료 주차',
  '유료 주차',
  '조식',
  '픽업 서비스',
  '족구장',
];
const petFacility = [
  '대형 운동장',
  '전용 마당',
  '놀이터',
  '샤워장',
  '수영장',
  '미끄럼 방지 바닥',
  '펜스 설치 공간',
  '돌봄 서비스',
  '펫 푸드 제공',
  '인근 동물병원',
];
const allowPet = ['소형견', '중형견', '대형견', '고양이'];

const LodgmentRegistration = () => {
  const [description, setDescription] = useState('');
  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: '',
  });

  const {
    selectedRegister: selectedAccommodationType,
    toggleRegister: selectAccommodationType,
  } = useRegister<string>();
  const { selectedRegister: selectedFacility, toggleRegister: selectFacility } =
    useRegister<string>();
  const {
    selectedRegister: selectedPetFacility,
    toggleRegister: selectPetFacility,
  } = useRegister<string>();
  const { selectedRegister: selectedAllowPet, toggleRegister: selectAllowPet } =
    useRegister<string>();

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= 2000) {
      setDescription(e.target.value);
    }
  };

  const POSTCODE_SCRIPT_URL =
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const handleAddressClick = () => {
    document.getElementById('addressButton')?.click();
  };

  return (
    <Fieldset>
      <Label>숙소명</Label>
      <Input type="text" placeholder="숙소명을 입력해주세요" />

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

      <Label>주소</Label>
      <RegisterAddress
        setAddressObj={setAddressObj}
        postcodeScriptUrl={POSTCODE_SCRIPT_URL}
      />
      <InputAddress
        type="text"
        value={`${addressObj.areaAddress} ${addressObj.townAddress}`}
        onClick={handleAddressClick}
      />
      <InputAddress type="text" placeholder="상세주소를 입력해주세요" />

      <Label>숙소 유형</Label>
      <OptionSelector
        options={accommodationType}
        selectedOptions={selectedAccommodationType}
        onSelect={selectAccommodationType}
      />

      <Label>허용 반려동물</Label>
      <OptionSelector
        options={allowPet}
        selectedOptions={selectedAllowPet}
        onSelect={selectAllowPet}
      />

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

      <Label>대표이미지</Label>
      <AvatarImageWrapper>
        <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </AvatarImageWrapper>

      <Label>이미지</Label>
      <ImageWrapper>
        <MaskedImageWrapper>
          <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </MaskedImageWrapper>
        <MaskedImageWrapper>
          <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </MaskedImageWrapper>
        <MaskedImageWrapper>
          <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </MaskedImageWrapper>
      </ImageWrapper>

      <Button>Submit</Button>
    </Fieldset>
  );
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

export default LodgmentRegistration;

const Fieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
  display: flex;
  flex-direction: column;
`;

const OptionSelectorWrapper = styled.div`
  margin-bottom: 10px;
`;

// 선택 버튼
const CheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: black;
  padding: 7px 10px;
  margin-bottom: 10px;
  // 버튼 사이 공백
  margin-right: 5px;
  cursor: pointer;
  border-radius: 20px;
`;

const Label = styled.label`
  font-family: 'Noto Sans KR';
  display: block;
  font-size: 1rem;
  margin: 10px 0;
  paddig: 16px;
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

const InputAddress = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 7px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
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

const AvatarImageWrapper = styled.div`
  width: 7rem;
  margin-bottom: 20px;
`;

const AvatarImage = styled.img`
  width: 100%;
`;

const MaskedImageWrapper = styled.div`
  display: inline-block;
  margin-right: 10px;
  width: 7rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
