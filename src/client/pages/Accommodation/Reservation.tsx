import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@components/common/RegisterHeader/index';
import useUserReservationList from '@hooks/query/user/useUserReservationList';
import ROUTES from '@constants/routes';
import {
  postConfirmReservation,
  postPreCheckReservation,
} from '@services/reservation';
import useIamportPayment from '@hooks/payment/useIamportPayment';
import { ReservationInfo, ReservationRequest } from '@typings/payment';

interface ButtonProps {
  selected: boolean;
}

interface Reservation {
  roomId: number;
  accommodationName: string;
  checkInDate: string;
  checkOutDate: string;
  peopleCount: number;
  perCount: number;
  reserverName: string;
  reservePhoneNumber: string;
  hasVehicle: boolean;
  totalPrice: number;
}

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshReservationList } = useUserReservationList('RESERVED', 0);
  const { state } = location;
  const { triggerPayment } = useIamportPayment();

  useEffect(() => {
    if (!state) {
      console.log('정보가 없습니다.');
      navigate(ROUTES.home);
    }
  }, [state]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const {
    roomId,
    accommodationName,
    totalPrice,
    checkInDate,
    checkOutDate,
    peopleCount,
    petCount,
  } = state || {};

  const calculateStayDuration = (checkInDate: string, checkOutDate: string) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const difference =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
    return difference;
  };

  const stayDuration = calculateStayDuration(checkInDate, checkOutDate);
  const adjustedTotalPrice = totalPrice * stayDuration;

  const [hasVehicle, setHasvehicle] = useState<boolean | null>(null);
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
    setReserverName(e.target.value);
  };

  const handleClick = (value: boolean) => {
    setHasvehicle(value);
  };

  const validateReservationInfo = () => {
    if (!reserverName || !/^[가-힣]+$/.test(reserverName))
      return '성명을 올바르게 입력해주세요.';

    if (
      !reserverPhoneNumber ||
      !/^\d{3}-\d{3,4}-\d{4}$/.test(reserverPhoneNumber)
    )
      return '휴대폰 번호를 올바르게 입력해주세요.';

    if (!hasVehicle) return '주차 여부를 선택해주세요.';
  };

  const handlePayment = async () => {
    const error = validateReservationInfo();
    if (error) {
      setFormError(error);
      return;
    }

    const reservationRequest = {
      accommodationName,
      roomId,
      checkInDate,
      checkOutDate,
      peopleCount,
      petCount,
      reserverName,
      reserverPhoneNumber,
      hasVehicle,
      totalPrice: adjustedTotalPrice,
    } as ReservationRequest;

    try {
      await postPreCheckReservation(reservationRequest);

      const merchantUid = `id_${Date.now()}`;

      const res = await triggerPayment({
        pg: 'html5_inicis',
        // pay_method: 'card',
        merchant_uid: merchantUid,
        name: accommodationName,
        amount: adjustedTotalPrice,
        buyer_name: reserverName,
        buyer_tel: reserverPhoneNumber,
        buyer_email: '',
      });

      if (res.success && res.imp_uid && res.merchant_uid) {
        const reservationInfo = {
          merchantUid,
          impUid: res.imp_uid,
          reservationRequest,
        } as ReservationInfo;

        await postConfirmReservation(reservationInfo);
        refreshReservationList('RESERVED');
        navigate(ROUTES.myPage.user.reservationList);
      } else {
        throw new Error(res.error_msg ?? '결제가 실패했습니다.');
      }
    } catch (error) {
      console.log(error);
      alert('결제중 오류가 발생했습니다.');
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
          selected={hasVehicle === true}
          onClick={() => handleClick(true)}
        >
          O
        </CheckInput>
        <CheckInput
          selected={hasVehicle === false}
          onClick={() => handleClick(false)}
        >
          X
        </CheckInput>
      </ButtonContainer>

      <SeparatorBox />
      <Wrappers>
        <HalfPay>
          <STotal>총 결제 금액</STotal>
        </HalfPay>
        <SAmountText>{adjustedTotalPrice.toLocaleString()}원</SAmountText>
      </Wrappers>
      <SButton onClick={handlePayment}>예약하기</SButton>
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
  height: 45px;
  font-size: 16px;
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
  padding: 3px 0;
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
  padding: 5px 0;
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
