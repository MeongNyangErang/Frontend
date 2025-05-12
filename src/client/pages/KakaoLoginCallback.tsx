import LoadingPage from './LoadingPage';
import useKakaoLoginCallback from '@hooks/page/useKakaoLoginCallback';

const KakaoLoginCallback = () => {
  useKakaoLoginCallback();

  return <LoadingPage />;
};

export default KakaoLoginCallback;
