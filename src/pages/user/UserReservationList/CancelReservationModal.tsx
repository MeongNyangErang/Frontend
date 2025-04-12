import styled from 'styled-components';
import { AxiosError } from 'axios';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';
import { cancelReservation } from '@services/reservation';

interface CancelModalProps {
  reservationToCancel: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CancelModal = ({
  reservationToCancel,
  onClose,
  onSuccess,
}: CancelModalProps) => {
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, resetError, updateError } = useError();

  const handleClose = () => {
    resetError();
    onClose();
  };

  const handleCancelReservation = async () => {
    if (!reservationToCancel) return;
    if (error) resetError();

    startIsLoading();
    try {
      await cancelReservation(reservationToCancel);
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        updateError(error.message);
      } else {
        updateError('에러가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      endIsLoading();
    }
  };

  return (
    <Modal
      variant="centered"
      isOpen={!!reservationToCancel}
      closeType="x"
      onClose={handleClose}
    >
      <SMessage>예약을 정말 취소하시나요?</SMessage>
      <SError>{error}</SError>
      <SButtons>
        <Button variant="grayBorder" disabled={isLoading} onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="accent"
          disabled={isLoading}
          onClick={handleCancelReservation}
        >
          확인
        </Button>
      </SButtons>
    </Modal>
  );
};

export default CancelModal;

const SMessage = styled.div`
  padding-top: 0px;
  margin-bottom: 20px;
`;

const SError = styled.div`
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.main};
`;

const SButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;

  > button {
    max-width: 120px;
    width: 100%;
  }
`;
