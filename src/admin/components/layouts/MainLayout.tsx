import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import useAdminLogout from '@admin/hooks/auth/useAdminLogout';
import Header from './Header';

const MainLayout = () => {
  useAdminLogout(); // logoutFn setting

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
    `${theme.layouts.headerHeight} ${theme.layouts.paddingX} 60px`};
  min-height: 100vh;
`;
const SAppContainer = styled.main`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layouts.adminWidth};
`;
