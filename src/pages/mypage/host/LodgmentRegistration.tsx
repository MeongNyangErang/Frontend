import React, { useState } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  selected: boolean;
}

const accommodationOptions = ['Hotel', 'Hostel', 'Airbnb', 'Motel'];
const petOptions = ['Dog', 'Cat', 'Rabbit', 'Bird'];
const FaOptions = ['Dog', 'Cat', 'Rabbit', 'Bird'];

const LodgmentRegistration = () => {
  const [selectedAccommodations, setSelectedAccommodations] = useState<
    string[]
  >([]);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [selectedFa, setselectedFa] = useState<string[]>([]);

  const selectAccommodation = (option: string) => {
    setSelectedAccommodations((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option],
    );
  };

  const selectPet = (option: string) => {
    setSelectedPets((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option],
    );
  };

  const selectFa = (option: string) => {
    setselectedFa((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option],
    );
  };

  return (
    <Fieldset>
      <Label>숙소명</Label>
      <Input type="text" placeholder="숙소명을 입력해주세요" />

      <Label>설명</Label>
      <Input type="text" placeholder="숙소 설명을 작성해주세요" />

      <Label>주소</Label>
      <Input type="text" placeholder="도로명 / 건물번호" />
      <Input type="text" placeholder="상세주소" />

      <Label>유형</Label>
      <OptionSelector
        options={accommodationOptions}
        selectedOptions={selectedAccommodations}
        onSelect={selectAccommodation}
      />

      <Label>편의시설</Label>
      <Label>반려동물 편의시설</Label>

      <Label>허용 반려동물</Label>
      <OptionSelector
        options={petOptions}
        selectedOptions={selectedPets}
        onSelect={selectPet}
      />

      <Label>편의시설</Label>
      <OptionSelector
        options={FaOptions}
        selectedOptions={selectedFa}
        onSelect={selectFa}
      />

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
    <div>
      {options.map((option) => (
        <CheckInput
          key={option}
          selected={selectedOptions.includes(option)}
          onClick={() => onSelect(option)}
        >
          {option}
        </CheckInput>
      ))}
    </div>
  );
};

export default LodgmentRegistration;

const Fieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 16px;
  border: none;
`;

// 선택 버튼
const CheckInput = styled.button<ButtonProps>`
  background-color: ${(props) => (props.selected ? '#eee' : '#fff')};
  color: black;
  border: 1px solid #ccc;
  padding: 7px 15px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 25px;
  &:hover {
    background-color: #ccc;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 8px;
`;

const Input = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  border: 1px solid #f03e5e;
  color: var(--gray-700);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--sub-color);
    color: white;
  }
`;
