import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../Button';

interface EditSuccessMessageProps {
  onClose: () => void;
  message: string;
}

const EditSuccessMessage = ({ onClose, message }: EditSuccessMessageProps) => {
  return (
    <SSuccessMessage>
      <span>
        <FaCheckCircle />
      </span>
      <p>{message}</p>
      <Button onClick={onClose} variant="main" fontSize="14px">
        닫기
      </Button>
    </SSuccessMessage>
  );
};

export default EditSuccessMessage;

const SSuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 100%;

  > span {
    display: flex;
    align-items: center;
    margin-top: -32px;
    font-size: 46px;
    color: ${({ theme }) => theme.colors.main};
    opacity: 0.4;
  }

  > p {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;
