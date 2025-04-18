import styled from 'styled-components';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';
import { deleteAccount } from '@services/profileEdit';
import { SFormTitle } from './styles';
import Button from '../Button';
import { SFormErrorMessage } from './styles';

interface WithdrawFormProps {
  onClose(): void;
}

const WithdrawForm = ({}: WithdrawFormProps) => {
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  const handleWithdraw = async () => {
    updateError('');

    startIsLoading();
    try {
      await deleteAccount();
      // logout?
    } catch (error) {
      console.log(error);
      updateError('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  return (
    <>
      <SFormTitle>회원 탈퇴</SFormTitle>
      <SButtonBox>
        <Button
          onClick={handleWithdraw}
          disabled={isLoading}
          variant="accent"
          fullWidth
          fixedHeight
        >
          탈퇴하기
        </Button>
        <SFormErrorMessage>{error}</SFormErrorMessage>
      </SButtonBox>
    </>
  );
};

export default WithdrawForm;

const SButtonBox = styled.div`
  margin-bottom: 6px;
  width: 100%;
`;
