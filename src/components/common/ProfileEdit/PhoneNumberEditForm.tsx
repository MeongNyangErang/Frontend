import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { validatePhoneNumber } from '@utils/validateSignUp';
import useError from '@hooks/ui/useError';
import useIsLoading from '@hooks/ui/useIsLoading';
import { changePhoneNumber } from '@services/profileEdit';
import Loader from '../Loader';
import {
  SFormTitle,
  SFormErrorMessage,
  SFormInputBox,
  SFormInput,
} from './styles';
import Button from '../Button';
import EditSuccessMessage from './EditSuccessMessage';

interface PhoneNumberEditFormProps {
  defaultValue: string;
  onClose(): void;
}

const PhoneNumberEditForm = ({
  defaultValue,
  onClose,
}: PhoneNumberEditFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState(defaultValue || '');
  const [isSuccess, setIsSuccess] = useState(false);
  const { updateError, error } = useError();
  const { updateError: updateSubmitError, error: submitError } = useError();
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();

  const handleSubmit = async () => {
    if (error) return;
    updateSubmitError('');
    startIsLoading();
    try {
      await changePhoneNumber(phoneNumber);
      setIsSuccess(true);
    } catch (error) {
      updateSubmitError('연락처 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  useEffect(() => {
    const error = validatePhoneNumber(phoneNumber);
    updateError(error);
  }, [phoneNumber]);

  if (isSuccess) {
    return (
      <EditSuccessMessage
        onClose={onClose}
        message="연락처가 변경되었습니다."
      />
    );
  }

  return (
    <>
      <SFormTitle>호스트 연락처 변경</SFormTitle>
      <SFormInputBox>
        <SFormInput
          type="text"
          placeholder="변경할 연락처를 입력해주세요"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <SFormErrorMessage>{error}</SFormErrorMessage>
      </SFormInputBox>
      <SSubmitButtonBox>
        <Button
          onClick={handleSubmit}
          variant="main"
          disabled={!!error || phoneNumber === defaultValue || isLoading}
          fixedHeight
          fullWidth
        >
          {isLoading ? (
            <Loader size={8} color="mainBorder" loading />
          ) : (
            '변경하기'
          )}
        </Button>
      </SSubmitButtonBox>
    </>
  );
};

export default PhoneNumberEditForm;

const SSubmitButtonBox = styled.div`
  padding-top: 20px;
  width: 100%;
`;
