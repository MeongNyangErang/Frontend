import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

const MainLayout = () => {
  return (
    <SContainer>
      <Header />
      <SContent>
        <SMain>
          <Outlet />
        </SMain>
        <Footer />
      </SContent>
      <MobileNav />
    </SContainer>
  );
};

export default MainLayout;

const SContainer = styled.div`
  overflow-x: hidden;
  width: 100%;
  min-width: 320px;
`;

const SContent = styled.div`
  padding-top: ${({ theme }) => theme.layouts.headerHeight};
  height: 100vh;
`;

const SMain = styled.main`
  margin: 0 auto;
  min-height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
`;
