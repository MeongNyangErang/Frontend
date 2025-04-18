import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { inputStyle, inputVariantStyles } from '@components/styles/mixins';
import { validateNickname } from '@utils/validateSignUp';
import useError from '@hooks/ui/useError';
import useIsLoading from '@hooks/ui/useIsLoading';
import { checkNicknameDuplicate } from '@services/signup';
import { changeNickname } from '@services/profileEdit';
import EditSuccessMessage from './EditSuccessMessage';
import { SFormTitle } from './styles';
import Button from '../Button';
import Loader from '../Loader';

interface NickNameEditFormProps {
  defaultValue: string;
  onClose(): void;
}

const NickNameEditForm = ({ defaultValue, onClose }: NickNameEditFormProps) => {
  const [text, setText] = useState(defaultValue);
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const { error, updateError } = useError();
  const { error: submitError, updateError: updateSubmitError } = useError();
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    if (duplicateCheck) setDuplicateCheck(false);
    if (submitError) updateSubmitError('');
    setText(e.target.value);
  };

  const handleClickDuplicateButton = async () => {
    if (error) return;
    startIsLoading();
    try {
      await checkNicknameDuplicate(text);
      setDuplicateCheck(true);
    } catch (error) {
      console.log(error);
      updateError('사용 할 수 없는 닉네임 입니다.');
    } finally {
      endIsLoading();
    }
  };

  const handleClickSubmitButton = async () => {
    if (error || isLoading) return;
    updateSubmitError('');
    startIsLoading();
    try {
      await changeNickname(text);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      updateSubmitError('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  useEffect(() => {
    const error = validateNickname(text);
    updateError(error);
  }, [text]);

  return isSuccess ? (
    <EditSuccessMessage onClose={onClose} message="닉네임이 변경되었습니다." />
  ) : (
    <SNickNameEditFormWrap>
      <SFormTitle>닉네임 변경</SFormTitle>
      <SInputWrap>
        <SInput type="text" value={text} onChange={handleChangeText} />
        <Button
          variant="accent"
          onClick={handleClickDuplicateButton}
          disabled={
            !!error ||
            text.length === 0 ||
            text === defaultValue ||
            duplicateCheck
          }
          fixedHeight
        >
          {duplicateCheck ? '확인완료' : '중복확인'}
        </Button>
      </SInputWrap>
      <Button
        variant="main"
        onClick={handleClickSubmitButton}
        fullWidth
        fixedHeight
        disabled={!duplicateCheck || !!error || isLoading}
      >
        {isLoading ? (
          <Loader size={8} color="grayBorder" loading />
        ) : (
          '변경하기'
        )}
      </Button>
      <SInputMessage>{error}</SInputMessage>
    </SNickNameEditFormWrap>
  );
};
export default NickNameEditForm;

const SNickNameEditFormWrap = styled.div`
  width: 100%;
`;

const SInputWrap = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.layouts.paddingX};
  width: 100%;
`;

const SInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray}
  flex: 1;
  margin-right: 16px;
`;

const SInputMessage = styled.p`
  padding-top: 6px;
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.main};
`;
