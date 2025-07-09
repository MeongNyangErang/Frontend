import { useState } from 'react';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';
import { deleteHostAccount, deleteUserAccount } from '@services/profileEdit';
import Button from '@shared/components/common/Button';
import { MemberRole } from '@typings/member';
import { SFormTitle, SFormErrorMessage } from './styles';
import { SButtonBox, SCheckboxArea, SContentBox } from './withdrawFormStyles';

interface WithdrawFormProps {
  role: MemberRole;
  onClose(): void;
}

const WithdrawForm = ({ role, onClose }: WithdrawFormProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  const handleWithdraw = async () => {
    if (!isChecked) return;

    updateError('');

    startIsLoading();
    try {
      role === 'USER' ? await deleteUserAccount() : await deleteHostAccount();
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
        <label
          htmlFor="withdraw-checkbox"
          className={isChecked ? 'is-active' : ''}
        >
          약관에 동의합니다.
        </label>
        <input
          id="withdraw-checkbox"
          type="checkbox"
          checked={isChecked}
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
        />
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
