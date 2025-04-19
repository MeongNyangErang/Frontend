import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useAuth from '@hooks/auth/useAuth';
import { media } from '@components/styles/responsive';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

const MainLayout = () => {
  const { member } = useAuth();
  const isMemberExist = !!member.data;
  return (
    <SContainer>
      <Header />
      <SContent $isMemberExist={isMemberExist}>
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
  width: 100%;
  min-width: 320px;
`;

const SContent = styled.div<{ $isMemberExist: boolean }>`
  padding-top: ${({ theme }) => theme.layouts.headerHeight};
  min-height: 100vh;

  ${({ $isMemberExist, theme }) =>
    $isMemberExist &&
    css`
      padding-bottom: ${theme.layouts.mobileNavHeight};
      ${media.tablet} {
        padding-bottom: 0;
      }
    `}
`;

const SMain = styled.main`
  margin: 0 auto;
  min-height: ${({ theme }) =>
    `calc(100vh - ${theme.layouts.headerHeight} - ${theme.layouts.footerHeight})`};
`;
