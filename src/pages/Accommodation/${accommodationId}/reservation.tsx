import { useState } from 'react';
import styled from 'styled-components';
import useRegister from '@hooks/page/useHostRegister';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface ButtonProps {
  selected: boolean;
}

const Accommodation = () => {
  const location = useLocation();
  const {
    accommodationName,
    checkInDate,
    checkOutDate,
    peopleCount,
    petCount,
    totalPrice,
  } = location.state || {};

  const hasVeichle = ['O', 'X'];
  const [reserverPhoneNumber, setReserverPhoneNumber] = useState('');
  const [reserverName, setReserverName] = useState('');

  const {
    selectedRegister: selectedHasVeichle,
    toggleRegister: setSelectedHasVeichle,
  } = useRegister<string>();

  const handleReserverPhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReserverPhoneNumber(e.target.value);
  };

  const handleReserverName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReserverName(e.target.value);
  };

  const handleSelectHasVeichle = (option: string) => {
    setSelectedHasVeichle(option);
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
          <CheckInput
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => onSelect(option)}
          >
            {option}
          </CheckInput>
        ))}
      </SOptionSelectorWrapper>
    );
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        roomId: 123,
        checkInDate,
        checkOutDate,
        peopleCount,
        petCount,
        reserverName,
        reserverPhoneNumber,
        hasVehicle: selectedHasVeichle.includes('O'),
        totalPrice: totalPrice.replace(/[^0-9]/g, ''),
      };

      const response = await axios.post(
        '/api/v1/users/reservations',
        paymentData,
      );
      if (response.status === 200) {
        alert('결제가 완료되었습니다!');
      } else {
        alert('결제 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('결제 API 호출 중 오류 발생:', error);
      alert('결제 처리에 오류가 발생했습니다.');
    }
  };

  return (
    <SFieldset>
      <SInputTittle value={accommodationName || ''} disabled />
      <Wrappers>
        <HalfWidth>
          <SLabel>체크인</SLabel>
          <SInputCheck value={checkInDate || ''} disabled />
        </HalfWidth>
        <HalfWidth>
          <SLabel>체크아웃</SLabel>
          <SInputCheck value={checkOutDate || ''} disabled />
        </HalfWidth>
      </Wrappers>
      <AmountWrapper>
        <SLabel>인원</SLabel>
        <SInputText value={peopleCount} disabled />
      </AmountWrapper>
      <AmountWrapper>
        <SLabel>반려동물</SLabel>
        <SInputText value={petCount} disabled />
      </AmountWrapper>
      <SeparatorBox />
      <SLabelInfo>예약자 정보</SLabelInfo>
      <SLabel>성명</SLabel>
      <SInputWrapper>
        <SInputTel
          type="text"
          placeholder="성명을 입력해주세요"
          value={reserverName}
          onChange={handleReserverName}
        />
      </SInputWrapper>
      <SLabel>휴대폰 번호</SLabel>
      <SInputWrapper>
        <SInputTel
          type="tel"
          placeholder="번호를 입력해주세요"
          value={reserverPhoneNumber}
          onChange={handleReserverPhoneNumber}
          pattern="^\d{3}-\d{4}-\d{4}$"
          required
        />
      </SInputWrapper>
      <SLabel>주차 여부</SLabel>
      <OptionSelector
        options={hasVeichle}
        selectedOptions={selectedHasVeichle}
        onSelect={handleSelectHasVeichle}
      />
      <Wrappers>
        <HalfPay>
          <SLabel>총 결제 금액</SLabel>
          <SAmountText>{totalPrice}원</SAmountText>
        </HalfPay>
        <HalfPay>
          <SButton onClick={handlePayment}>결제하기</SButton>
        </HalfPay>
      </Wrappers>
    </SFieldset>
  );
};

export default Accommodation;

const Wrappers = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SLabelInfo = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

const HalfWidth = styled.div`
  width: 50%;
`;

const HalfPay = styled.div`
  width: 25%;
`;

const SButton = styled.button`
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

const SFieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const SLabel = styled.label`
  font-family: 'Noto Sans KR';
  margin-bottom: 5px;
`;

const SInputTittle = styled.input`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SInputCheck = styled.input`
  margin-top: 5px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const SInputCount = styled.input`
  margin-left: 25px;
  magin: 10px;
`;

const SInputText = styled.input`
  margin-top: 5px;
  margin-bottom: 10px;
`;

const SInputTel = styled.input`
  margin: 5px 2px;
`;

const SAmountText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #f03e5e;
`;

const SOptionSelectorWrapper = styled.div`
  margin-bottom: 15px;
`;

const AmountWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SeparatorBox = styled.div`
  height: 2px;
  background-color: #ccc;
  margin: 15px 0;
`;

const SInputWrapper = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  width: 50%;
`;

const CheckInput = styled.button<ButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? '#f03e5e' : '#ccc')};
  color: black;
  padding: 7px 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 15px;
`;
