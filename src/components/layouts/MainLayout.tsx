import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

const MainLayout = () => {
  return (
    <SContainer>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Nav />
    </SContainer>
  );
};

export default MainLayout;

const SContainer = styled.div`
  position: relative;

  > header {
    position: sticky;
    top: 0;
  }

  > main {
    min-height: ${({ theme }) =>
      `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
  }

  > nav {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
