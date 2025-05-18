import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@shared/components/common/Modal';
import useError from '@shared/hooks/ui/useError';
import useKakaoLoginCallback from '@hooks/page/useKakaoLoginCallback';
import LoadingPage from './LoadingPage';
import ROUTES from '@constants/routes';

const KakaoLoginCallback = () => {
  const { error, updateError, resetError } = useError();
  const navigate = useNavigate();
  const onKakaoLoginError = useCallback((message: string) => {
    updateError(message);
  }, []);
  const handleCloseErrorModal = () => {
    resetError();
    navigate(ROUTES.logIn);
  };

  useKakaoLoginCallback(onKakaoLoginError);

  return (
    <>
      <LoadingPage />
      <Modal
        variant="centered"
        closeType="none"
        isOpen={!!error}
        role="alert"
        onClose={handleCloseErrorModal}
      >
        {error}
      </Modal>
    </>
  );
};

export default KakaoLoginCallback;
