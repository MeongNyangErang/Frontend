import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@components/common/RegisterHeader/index';

interface ButtonProps {
  selected: boolean;
}

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    accommodationName,
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
  const [formError, setFormError] = useState<string>('');

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
    const inputValue = e.target.value;

    const koreanRegex = /^[가-힣]*$/;
    if (koreanRegex.test(inputValue)) {
      setReserverName(inputValue);
    }
  };

  const handleClick = (value: string) => {
    setHasvehicle(value);
  };

  const handlePayment = async () => {
    if (!reserverName || !/^[가-힣]+$/.test(reserverName)) {
      setFormError('성명을 올바르게 입력해주세요.');
      return;
    }

    if (
      !reserverPhoneNumber ||
      !/^\d{3}-\d{3,4}-\d{4}$/.test(reserverPhoneNumber)
    ) {
      setFormError('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }

    if (!hasvehicle) {
      setFormError('주차 여부를 선택해주세요.');
      return;
    }

    try {
      const sanitizedTotalPrice = totalPrice
        ? totalPrice.replace(/[^0-9]/g, '')
        : '0';
      const paymentData = {
        roomId,
        checkInDate,
        checkOutDate,
        peopleCount,
        petCount,
        reserverName,
        reserverPhoneNumber,
        hasvehicle,
        totalPrice: sanitizedTotalPrice,
      };
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(
        `${BASE_URL}/accommodation/:accommodationId/reservation`,
        paymentData,
      );
      if (response.status === 200) {
        alert('예약이 완료되었습니다!');
      } else {
        alert('예약이 실패했습니다.');
      }
    } catch (error) {
      console.error('결제 API 호출 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <SFieldset>
      <Header title="예약" />
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
      {formError && <ErrorText>{formError}</ErrorText>}
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

      <SeparatorBox />
      <Wrappers>
        <HalfPay>
          <STotal>총 결제 금액</STotal>
        </HalfPay>
        <SAmountText>{totalPrice}원</SAmountText>
      </Wrappers>
      <SButton onClick={handlePayment}>결제하기</SButton>
    </SFieldset>
  );
};

export default Reservation;
const ErrorText = styled.p`
  color: red;
  font-size: 15px;
  margin: 5px 0;
  font-family: 'Noto Sans KR';
`;

const SInputTittle = styled.input`
  margin-top: 20px;
  font-size: 25px;
  margin-bottom: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Wrappers = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SLabelInfo = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const HalfWidth = styled.div`
  width: 50%;
`;

const HalfPay = styled.div`
  width: 25%;
`;

const SButton = styled.button`
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
  background-color: #f03e5e;
  &:hover {
    background-color: rgb(235, 47, 81);
  }
`;

const SFieldset = styled.fieldset`
  font-family: 'Noto Sans KR';
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
  background-color: white;
`;

const SLabel = styled.label`
  font-family: 'Noto Sans KR';
  margin-top: 10px;
  margin-bottom: 3px;
  font-size: 16px;
`;

const STotal = styled.label`
  font-family: 'Noto Sans KR';
  margin-bottom: 10px;
  margin-top: 10px;
  display: block;
  font-weight: bold;
  font-size: 18px;
`;

const SInputCheck = styled.input`
  margin-left: 15px;
  margin-top: 5px;
  font-weight: bold;
  font-size: 16px;
`;

const SInputText = styled.input`
  margin-top: 10px;
`;

const SInputTel = styled.input`
  margin: 7px 2px;
  font-size: 16px;
`;

const SAmountText = styled.p`
  font-size: 18px;
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
  background-color: var(--gray-100);
  margin: 15px 0;
`;

const SInputWrapper = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
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
