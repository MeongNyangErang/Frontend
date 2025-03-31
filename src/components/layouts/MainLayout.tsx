import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

const MainLayout = () => {
  return (
    <SContainer>
      <Header />
      <SContent>
        <main>
          <Outlet />
        </main>
        <Footer />
      </SContent>
      <Nav />
    </SContainer>
  );
};

export default MainLayout;

const SContainer = styled.div`
  position: relative;

  > header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  > nav {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const SContent = styled.div`
  padding-top: ${({ theme }) => theme.layouts.headerHeight};
  overflow-y: auto;
  height: 100vh;

  > main {
    min-height: ${({ theme }) =>
      `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
  }
`;
