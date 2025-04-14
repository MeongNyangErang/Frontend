import Button from '@components/common/Button';
import useLoginForm from '@hooks/page/useLoginForm';
import { MemberRole } from '@typings/member';
import { SForm } from './styles';

interface Props {
  memberType: MemberRole;
  isLoading: boolean;
  onStart(): void;
  onEnd(): void;
  onError(message: string): void;
}

const LoginForm = ({
  memberType,
  isLoading,
  onStart,
  onEnd,
  onError,
}: Props) => {
  const { formData, onChange, onSubmit } = useLoginForm(
    memberType,
    onStart,
    onEnd,
    onError,
  );

  return (
    <>
      <SForm onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={(e) => {
            onChange(e, 'email');
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e) => {
            onChange(e, 'password');
          }}
        />
        <Button
          type="submit"
          variant="main"
          fontSize="14px"
          fullWidth={true}
          fixedHeight={true}
          isLoading={isLoading}
        >
          {memberType === 'user' ? '로그인' : '호스트회원 로그인'}
        </Button>
      </SForm>
    </>
  );
};

export default LoginForm;
