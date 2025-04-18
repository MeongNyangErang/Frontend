import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import useError from '@hooks/ui/useError';
import useIsLoading from '@hooks/ui/useIsLoading';

import {
  passwordEditFormData,
  passwordEditFormFields,
} from '@constants/profileEdit';
import { changePassword } from '@services/profileEdit';
import { validatePassword, validatePasswordCheck } from '@utils/validateSignUp';
import Button from '../Button';
import {
  SFormTitle,
  SFormInputBox,
  SFormInput,
  SFormLabel,
  SFormErrorMessage,
} from './styles';
import Loader from '../Loader';
import EditSuccessMessage from './EditSuccessMessage';

interface PasswordEditFormProps {
  onClose(): void;
}

const PasswordEditForm = ({ onClose }: PasswordEditFormProps) => {
  const [formData, setFormData] = useState({ ...passwordEditFormData });
  const [formError, setFormError] = useState({ ...passwordEditFormData });
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();
  const [isSuccess, setIsSuccess] = useState(false);
  const isFormEmpty = Object.values(formData).some((v) => !v);
  const isFormError = Object.values(formError).some((v) => v);

  const handleChangeFormData = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof formData,
  ) => {
    const value = e.target.value;
    const error =
      key === 'newPasswordCheck'
        ? validatePasswordCheck(formData.newPassword, value)
        : validatePassword(value);
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormError((prev) => ({ ...prev, [key]: error }));
  };

  const handleClickSubmit = async () => {
    if (isFormEmpty || isFormError) return;
    updateError('');
    startIsLoading();
    try {
      await changePassword(formData.password, formData.newPassword);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      updateError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  if (isSuccess) {
    return (
      <EditSuccessMessage
        onClose={onClose}
        message="비밀번호가 변경되었었습니다."
      />
    );
  }

  return (
    <SPasswordEditFormWrap>
      <SFormTitle>비밀번호 변경</SFormTitle>
      {passwordEditFormFields.map(({ id, label, placeholder }) => (
        <SFormInputBox key={id}>
          <SFormLabel>{label}</SFormLabel>
          <SFormInput
            type="password"
            value={formData[id]}
            onChange={(e) => handleChangeFormData(e, id)}
            placeholder={placeholder}
          />
          <SFormErrorMessage>{formError[id]}</SFormErrorMessage>
        </SFormInputBox>
      ))}
      <SSubmitButtonBox>
        <Button
          onClick={handleClickSubmit}
          variant="main"
          disabled={isFormEmpty || isFormError}
          fullWidth
          fixedHeight
        >
          {isLoading ? (
            <Loader size={8} color="grayBorder" loading />
          ) : (
            '변경하기'
          )}
        </Button>
      </SSubmitButtonBox>
      <SFormErrorMessage>{error}</SFormErrorMessage>
    </SPasswordEditFormWrap>
  );
};

export default PasswordEditForm;

const SPasswordEditFormWrap = styled.div`
  width: 100%;
`;

const SSubmitButtonBox = styled.div`
  padding-top: 30px;
  margin-bottom: 8px;
`;
