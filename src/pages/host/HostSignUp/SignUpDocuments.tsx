import { ChangeEvent, useCallback, useRef } from 'react';
import styled from 'styled-components';
import SubPageHeader from '@components/common/SubPageHeader';
import { SFormGroup, SInputBox, SMessage } from '@components/styles/formStyles';
import {
  inputStyle,
  inputVariantStyles,
  labelDotStyle,
} from '@components/styles/mixins';
import Button from '@components/common/Button';
import { FileFormatFields, SignUpFormError } from '@typings/signUp';

interface Props {
  registration: File | null | undefined;
  permit: File | null | undefined;
  formError: SignUpFormError;
  updateError(key: keyof SignUpFormError, message: string): void;
  onChange(key: FileFormatFields, file: File | null): void;
  onNext(): void;
  onPrev(): void;
}

const SignUpDocuments = ({
  registration,
  permit,
  formError,
  updateError,
  onChange,
  onNext,
  onPrev,
}: Props) => {
  const isAllSelected = registration && permit;
  const registrationRef = useRef<HTMLInputElement>(null);
  const permitRef = useRef<HTMLInputElement>(null);
  const handleChangeInput = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      key: 'businessRegistration' | 'accommodationPermit',
    ) => {
      const files = e.target.files;
      const keyMap = {
        businessRegistration: '사업자 등록증',
        accommodationPermit: '숙박업 허가증',
      };
      onChange(key, files ? files[0] : null);
      if (files?.[0] && formError[key]) updateError(key, '');
      if (!files?.[0]) updateError(key, `${keyMap[key]}를 첨부해주세요.`);
    },
    [formError.accommodationPermit, formError.businessRegistration],
  );
  return (
    <>
      <SubPageHeader title="호스트 회원 가입" style="arrow" onClick={onPrev} />
      <SWrap>
        <SDesc>
          안전한 숙소 예약 환경을 위하여
          <br />
          <strong>사업자 등록</strong>된 숙소만 호스트로 가입 할 수 있어요
        </SDesc>

        <SInputArea>
          <SFormGroup>
            <SLabel>사업자 등록증</SLabel>
            <SInputBox>
              <SFileDisplay className={registration ? 'selected' : ''}>
                {registration
                  ? registration.name
                  : 'jpg/jpeg/png 형식만 가능합니다.'}
              </SFileDisplay>
              <Button
                onClick={() => {
                  registrationRef.current!.click();
                }}
                variant="accent"
                fontSize="12px"
                fixedHeight={true}
              >
                파일첨부
              </Button>
              <input
                id="businessRegistration"
                type="file"
                placeholder="jpg/jpeg/png 파일만 가능"
                accept=".jpg,.jpeg,.png"
                ref={registrationRef}
                onChange={(e) => {
                  handleChangeInput(e, 'businessRegistration');
                }}
              />
            </SInputBox>
            <SMessage type="error">{formError.businessRegistration}</SMessage>
          </SFormGroup>
          <SFormGroup>
            <SLabel>숙박업 허가증</SLabel>
            <SInputBox>
              <SFileDisplay className={permit ? 'selected' : ''}>
                {permit ? permit.name : 'jpg/jpeg/png 형식만 가능합니다.'}
              </SFileDisplay>
              <Button
                onClick={() => {
                  permitRef.current!.click();
                }}
                variant="accent"
                fontSize="12px"
                fixedHeight={true}
              >
                파일첨부
              </Button>
              <input
                id="accommodationPermit"
                type="file"
                placeholder="jpg/jpeg/png 파일만 가능"
                accept=".jpg,.jpeg,.png"
                ref={permitRef}
                onChange={(e) => {
                  handleChangeInput(e, 'accommodationPermit');
                }}
              />
            </SInputBox>
            <SMessage type="error"></SMessage>
          </SFormGroup>
        </SInputArea>
        <Button
          onClick={onNext}
          variant="main"
          fullWidth={true}
          fixedHeight={true}
          fontSize="14px"
          disabled={!isAllSelected}
        >
          다음
        </Button>
      </SWrap>
    </>
  );
};

export default SignUpDocuments;

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;
  padding: ${({ theme }) => `32px ${theme.layouts.paddingX}`};
`;

const SDesc = styled.p`
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.main};
    font-weight: 500;
  }
`;

const SInputArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  input {
    display: none;
  }
`;

const SLabel = styled.span`
  ${labelDotStyle}
`;

const SFileDisplay = styled.div`
  ${inputStyle}
  ${inputVariantStyles.gray}
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray500};

  &.selected {
    color: ${({ theme }) => theme.colors.gray700};
    font-weight: 500;
  }
`;
