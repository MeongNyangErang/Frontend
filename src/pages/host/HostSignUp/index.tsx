import SignUpForm from '@components/common/SignUpForm';
import useSignUp from '@hooks/page/useSignUp';
import SignUpProfileImage from '@components/common/ProfileImage/SignUpProfileImage';
import Modal from '@components/common/Modal';
import { SSignUpWrap, SSignUpContainer } from '@pages/user/UserSignUp/styles';
import SignUpDocuments from './SignUpDocuments';

const HostSignUp = () => {
  const {
    step,
    formData,
    formError,
    successMessage,
    handleConfirmSuccessMessage,
    onChangeStep,
    goToLogin,
    updateError,
    onChangeInput,
    onChangeFileData,
    onSubmit,
    ...rest
  } = useSignUp('host');
  return (
    <SSignUpWrap>
      <SSignUpContainer>
        {step === 1 && (
          <SignUpForm
            type="host"
            formData={formData}
            formError={formError}
            onChange={onChangeInput}
            onPrev={goToLogin}
            onNext={() => onChangeStep(2)}
            {...rest}
          />
        )}
        {step === 2 && (
          <SignUpDocuments
            registration={formData.businessRegistration}
            permit={formData.accommodationPermit}
            formError={formError}
            updateError={updateError}
            onChange={onChangeFileData}
            onPrev={() => onChangeStep(1)}
            onNext={() => onChangeStep(3)}
          />
        )}
        {step === 3 && (
          <SignUpProfileImage
            profileImage={formData.profileImage}
            onChange={onChangeFileData}
            onPrev={() => onChangeStep(2)}
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

export default HostSignUp;
