import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { validateName } from '@utils/validateSignUp';
import useError from '@hooks/ui/useError';
import useIsLoading from '@hooks/ui/useIsLoading';
import { changeName } from '@services/profileEdit';
import {
  SFormTitle,
  SFormErrorMessage,
  SFormInputBox,
  SFormInput,
} from './styles';
import Button from '../Button';
import EditSuccessMessage from './EditSuccessMessage';
import Loader from '../Loader';

interface NameEditFormProps {
  defaultValue: string;
  onClose(): void;
}

const NameEditForm = ({ defaultValue, onClose }: NameEditFormProps) => {
  const [name, setName] = useState(defaultValue || '');
  const [isSuccess, setIsSuccess] = useState(false);
  const { updateError, error } = useError();
  const { updateError: updateSubmitError, error: submitError } = useError();
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();

  const handleSubmit = async () => {
    if (error) return;
    updateSubmitError('');
    startIsLoading();
    try {
      await changeName(name);
      setIsSuccess(true);
    } catch (error) {
      updateSubmitError('이름 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  useEffect(() => {
    const error = validateName(name);
    updateError(error);
  }, [name]);

  if (isSuccess) {
    return (
      <EditSuccessMessage onClose={onClose} message="이름이 변경되었습니다." />
    );
  }

  return (
    <>
      <SFormTitle>호스트 이름 변경</SFormTitle>
      <SFormInputBox>
        <SFormInput
          type="text"
          placeholder="변경할 이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SFormErrorMessage>{error}</SFormErrorMessage>
      </SFormInputBox>
      <SSubmitButtonBox>
        <Button
          onClick={handleSubmit}
          variant="main"
          disabled={!!error || name === defaultValue || isLoading}
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
      <SFormErrorMessage>{submitError}</SFormErrorMessage>
    </>
  );
};

export default NameEditForm;

const SSubmitButtonBox = styled.div`
  padding-top: 20px;
  width: 100%;
`;
