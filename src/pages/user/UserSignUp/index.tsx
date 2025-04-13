import SignUpForm from '@components/common/SignUpForm';
import Modal from '@components/common/Modal';
import useSignUp from '@hooks/page/useSignUp';
import SignUpProfileImage from '@components/common/ProfileImage/SignUpProfileImage';
import { SSignUpWrap, SSignUpContainer } from './styles';

const UserSignUp = () => {
  const {
    step,
    formData,
    formError,
    successMessage,
    handleConfirmSuccessMessage,
    updateError,
    onChangeStep,
    onChangeInput,
    onChangeFileData,
    goToLogin,
    onSubmit,
    ...rest
  } = useSignUp('user');

  return (
    <SSignUpWrap>
      <SSignUpContainer>
        {step === 1 ? (
          <SignUpForm
            type="user"
            formData={formData}
            formError={formError}
            onChange={onChangeInput}
            onPrev={goToLogin}
            onNext={() => onChangeStep(2)}
            {...rest}
          />
        ) : (
          <SignUpProfileImage
            profileImage={formData.profileImage}
            onChange={onChangeFileData}
            onPrev={() => onChangeStep(1)}
            onClick={onSubmit}
          />
        )}
        <Modal
          isOpen={!!formError.emailCode}
          closeType="none"
          variant="centered"
          role="alert"
          onClose={() => {
            updateError('emailCode', '');
          }}
        >
          {formError.emailCode.split('\n').map((line, i) => {
            return <div key={i}>{line}</div>;
          })}
        </Modal>
        <Modal
          isOpen={!!successMessage}
          closeType="x"
          variant="centered"
          role="confirm"
          onClose={handleConfirmSuccessMessage}
        >
          {successMessage}
        </Modal>
      </SSignUpContainer>
    </SSignUpWrap>
  );
};

export default UserSignUp;
