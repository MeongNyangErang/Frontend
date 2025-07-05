import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { deleteAccount } from '@services/profileEdit';
import Button from '@shared/components/common/Button';
import { SFormTitle, SFormErrorMessage } from './styles';
import { SButtonBox, SCheckboxArea, SContentBox } from './withdrawFormStyles';

interface WithdrawFormProps {
  onClose(): void;
}

const WithdrawForm = ({}: WithdrawFormProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  const handleWithdraw = async () => {
    if (!isChecked) return;

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
      <SContentBox>탈퇴 약관 입니다.</SContentBox>
      <SCheckboxArea>
        <span>약관에 동의합니다.</span>
        <input
          id="withdraw-checkbox"
          type="checkbox"
          checked={isChecked}
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
        />
        <label
          htmlFor="withdraw-checkbox"
          className={isChecked ? 'is-active' : ''}
        >
          {isChecked && <FaCheck />}
        </label>
      </SCheckboxArea>
      <SButtonBox>
        <Button
          onClick={handleWithdraw}
          disabled={isLoading || !isChecked}
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
