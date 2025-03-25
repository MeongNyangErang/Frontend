import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <SWrap>
      <SContainer>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </SContainer>
    </SWrap>
  );
};

export default MainLayout;

const SWrap = styled.div``;
const SContainer = styled.div``;
