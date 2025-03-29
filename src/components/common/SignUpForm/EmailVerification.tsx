import { ChangeEvent, useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { inputStyle, inputVariantStyles } from '@components/styles/mixins';
import { formatSecondsToTime } from '@utils/formatter';
import Button from '../Button';

interface Props {
  isEmailChecked: boolean;
  isEmailCodeChecked: boolean;
  isEmailCodeRequested: boolean;
  isLoading: boolean;
  onRequestCode(): Promise<boolean>;
  onVerifyCode(code: string, timeLeft: number): Promise<boolean>;
}

const EmailVerification = ({
  isEmailChecked,
  isEmailCodeChecked,
  isEmailCodeRequested,
  isLoading,
  onRequestCode,
  onVerifyCode,
}: Props) => {
  const [text, setText] = useState('');
  const [timeCount, setTimeCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleRequestButtonClick = useCallback(async () => {
    if (text) setText('');
    if (inputRef.current) inputRef.current.focus();
    const success = await onRequestCode();
    if (success) {
      setTimeCount(60 * 3);
    }
  }, [text, onRequestCode]);

  const handleVerifyButtonClick = useCallback(async () => {
    const success = await onVerifyCode(text, timeCount);
    if (success && timeCount > 0) {
      clearTimeout(timeoutRef.current!);
      setTimeCount(0);
    }
  }, [text, timeCount, onVerifyCode]);

  useEffect(() => {
    if (timeCount === 0) return;
    timeoutRef.current = setTimeout(() => {
      setTimeCount(timeCount - 1);
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeCount]);

  if (!isEmailCodeRequested) {
    return (
      <SWrap>
        <Button
          fontSize="12px"
          variant="accent"
          fixedHeight={true}
          fullWidth={true}
          onClick={handleRequestButtonClick}
          disabled={!isEmailChecked}
        >
          이메일로 인증번호 받기
        </Button>
      </SWrap>
    );
  }

  return (
    <SWrap>
      <SInputArea>
        <input
          type="text"
          value={text}
          placeholder="인증번호를 입력해주세요"
          onChange={handleChange}
          ref={inputRef}
        />
        <STimeBox>{formatSecondsToTime(timeCount)}</STimeBox>
        <button
          type="button"
          onClick={handleRequestButtonClick}
          disabled={isEmailCodeChecked}
        >
          재전송
        </button>
      </SInputArea>
      <Button
        fontSize="12px"
        variant="accent"
        fixedHeight={true}
        fullWidth={true}
        isLoading={isLoading}
        disabled={!text || isEmailCodeChecked}
        onClick={handleVerifyButtonClick}
      >
        {isEmailCodeChecked ? '인증 완료' : '인증번호 확인'}
      </Button>
    </SWrap>
  );
};

export default EmailVerification;

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.layouts.paddingX};
  margin-top: ${({ theme }) => theme.layouts.paddingX};
  width: 100%;
`;

const SInputArea = styled.div`
  ${inputStyle}
  ${inputVariantStyles.gray}
  display: flex;
  align-items: center;
  column-gap: 16px;

  > input {
    flex: 1;
  }

  > button {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray500}`};
  }
`;

const STimeBox = styled.div`
  color: ${({ theme }) => theme.colors.main};
`;
