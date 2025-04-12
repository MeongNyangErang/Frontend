import { SignUpFormProps } from '@typings/signUp';
import { hostSignUpFields, userSignUpFields } from '@constants/signUp/form';
import {
  SFormGroup,
  SInputBox,
  SInput,
  SMessage,
} from '@components/styles/formStyles';
import SignUpHeader from '../SignUpHeader';
import { SWrap, SForm } from './styles';
import EmailVerification from './EmailVerification';
import Button from '../Button';

const SignUpForm = <T extends 'user' | 'host'>({
  type,
  loading,
  formData,
  formError,
  checkStatus,
  isEmailCodeRequested,
  onChange,
  onCheckEmail,
  onCheckNickname,
  onRequestCode,
  onVerifyCode,
  onPrev,
  onNext,
}: SignUpFormProps<T>) => {
  const fields = type === 'user' ? userSignUpFields : hostSignUpFields;
  type FieldKeys = (typeof fields)[number]['id'];
  const title = type === 'user' ? '일반 회원가입' : '호스트 회원가입';
  const isEmpty = fields.some(({ id }) => !formData[id as FieldKeys]);
  const isError = fields.some(({ id }) => formError[id as FieldKeys]);
  const allChecked = Object.values(checkStatus).every((s) => s);
  const onCheck = (key: 'email' | 'nickname') =>
    key === 'email' ? onCheckEmail : onCheckNickname;

  return (
    <>
      <SignUpHeader title={title} onClick={onPrev} />
      <SWrap>
        <SForm>
          {fields.map(({ name, id, placeholder, type }) => {
            const typedId = id as FieldKeys;
            return (
              <SFormGroup key={id}>
                <label htmlFor={typedId}>{name}</label>
                <SInputBox>
                  <SInput
                    type={type}
                    placeholder={placeholder}
                    value={formData[typedId] as string}
                    onChange={(e) => onChange(e, typedId)}
                  />
                  {(typedId === 'email' || typedId === 'nickname') && (
                    <Button
                      fontSize="12px"
                      variant="accent"
                      onClick={onCheck(typedId)}
                      fixedHeight={true}
                      isLoading={loading[typedId]}
                      disabled={
                        !formData[typedId] ||
                        !!formError[typedId] ||
                        checkStatus[typedId as 'email' | 'nickname']
                      }
                    >
                      중복확인
                    </Button>
                  )}
                </SInputBox>

                {formError[typedId] && (
                  <SMessage type="error">{formError[typedId]}</SMessage>
                )}

                {(typedId === 'email' || typedId === 'nickname') &&
                  checkStatus[typedId as 'email' | 'nickname'] && (
                    <SMessage type="success">
                      사용가능한 {name} 입니다.
                    </SMessage>
                  )}

                {typedId === 'email' && (
                  <EmailVerification
                    isEmailChecked={checkStatus['email']}
                    isEmailCodeChecked={checkStatus['emailCode']}
                    isEmailCodeRequested={isEmailCodeRequested}
                    onRequestCode={onRequestCode}
                    onVerifyCode={onVerifyCode}
                    isLoading={loading.emailCode}
                  />
                )}
              </SFormGroup>
            );
          })}
        </SForm>
        <Button
          fontSize="14px"
          variant="main"
          onClick={onNext}
          fixedHeight={true}
          fullWidth={true}
          disabled={isEmpty || isError || !allChecked}
        >
          다음
        </Button>
      </SWrap>
    </>
  );
};

export default SignUpForm;
