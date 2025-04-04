import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ButtonProps {
  selected: boolean;
}

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    roomId,
    checkInDate,
    checkOutDate,
    peopleCount,
    petCount,
    totalPrice,
  } = location.state || {};

  useEffect(() => {
    if (
      !roomId ||
      !checkInDate ||
      !checkOutDate ||
      !peopleCount ||
      !petCount ||
      !totalPrice
    ) {
      /*
      // 값 없을 경우 경로 이동
      navigate('/');
      */
    }
  }, [
    roomId,
    checkInDate,
    checkOutDate,
    peopleCount,
    petCount,
    totalPrice,
    navigate,
  ]);

  const [hasvehicle, setHasvehicle] = useState<string | null>(null);
  const [reserverPhoneNumber, setReserverPhoneNumber] = useState('');
  const [reserverName, setReserverName] = useState('');

  const handleReserverPhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) {
      setReserverPhoneNumber(value);
    } else if (value.length <= 7) {
      setReserverPhoneNumber(value.replace(/(\d{3})(\d{1,4})/, '$1-$2'));
    } else if (value.length <= 11) {
      setReserverPhoneNumber(
        value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'),
      );
    }
  };

  const handleReserverName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[가-힣]*$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setReserverName(e.target.value);
    }
  };

  const handleClick = (value: string) => {
    setHasvehicle(value);
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        roomId,
        checkInDate,
        checkOutDate,
        peopleCount,
        petCount,
        reserverName,
        reserverPhoneNumber,
        hasvehicle,
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
          required
        />
      </SInputWrapper>
      <SLabel>휴대폰 번호</SLabel>
      <SInputWrapper>
        <SInputTel
          type="tel"
          placeholder="번호를 입력해주세요"
          value={reserverPhoneNumber}
          onChange={handleReserverPhoneNumber}
          required
        />
      </SInputWrapper>
      <SLabel>주차 여부</SLabel>
      <ButtonContainer>
        <CheckInput
          selected={hasvehicle === 'O'}
          onClick={() => handleClick('O')}
        >
          O
        </CheckInput>
        <CheckInput
          selected={hasvehicle === 'X'}
          onClick={() => handleClick('X')}
        >
          X
        </CheckInput>
      </ButtonContainer>
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

export default Reservation;

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

const SInputCheck = styled.input`
  margin-top: 5px;
  margin-bottom: 15px;
  font-weight: bold;
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
  width: 8%;
  padding: 5px 0px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: center;
`;
