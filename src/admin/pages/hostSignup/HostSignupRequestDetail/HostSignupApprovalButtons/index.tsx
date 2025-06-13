import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/common/Button';
import useHostSignupRequestList from '@admin/hooks/query/useHostSignupRequestList';
import ROUTES from '@admin/constants/routes';
import Modal from '@shared/components/common/Modal';
import useHostSignupApproval from './useHostSignupApproval';

interface HostSignupApprovalButtonsProps {
  hostId: number;
}
const HostSignupApprovalButtons = ({
  hostId,
}: HostSignupApprovalButtonsProps) => {
  const { isLoading, error, handleClickButton, resetError } =
    useHostSignupApproval(hostId);
  const { refreshHostSignupRequestList } = useHostSignupRequestList(0, false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    refreshHostSignupRequestList();
    navigate(ROUTES.hosts.root(0));
  };

  return (
    <>
      <SButtonWrap>
        <Button
          variant="grayBorder"
          onClick={() => handleClickButton('reject', handleSuccess)}
          disabled={isLoading}
          fixedHeight
          fullWidth
        >
          거절
        </Button>
        <Button
          variant="grayBorder"
          onClick={() => handleClickButton('approve', handleSuccess)}
          disabled={isLoading}
          fixedHeight
          fullWidth
        >
          승인
        </Button>
      </SButtonWrap>
      <Modal
        isOpen={!!error}
        variant="centered"
        closeType="none"
        role="alert"
        onClose={resetError}
      >
        {error}
      </Modal>
    </>
  );
};

export default HostSignupApprovalButtons;

const SButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;
