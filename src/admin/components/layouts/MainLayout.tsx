import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <SAppWrap>
        <SAppContainer>
          <Outlet />
        </SAppContainer>
      </SAppWrap>
    </>
  );
};

export default MainLayout;

const SAppWrap = styled.div`
  padding: ${({ theme }) =>
    `${theme.layouts.headerHeight} ${theme.layouts.paddingX} 0`};
  min-height: 100vh;
`;
const SAppContainer = styled.main`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
`;
