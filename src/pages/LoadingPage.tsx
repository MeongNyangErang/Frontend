import styled from 'styled-components';
import Loader from '@components/common/Loader';

const LoadingPage = () => {
  return (
    <SLoadingPageWrap>
      <Loader color="mainBorder" size={15} loading />
    </SLoadingPageWrap>
  );
};

export default LoadingPage;

const SLoadingPageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;
