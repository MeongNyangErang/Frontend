import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';
import logoImage from '@assets/images/logo.png';
import ROUTES from '@constants/routes';
import { buttonStyle } from '@components/styles/mixins';
import useAuth from '@hooks/auth/useAuth';

const Header = () => {
  const { member } = useAuth();
  return (
    <SHeader>
      <SLogo to={ROUTES.home}>
        <img src={logoImage} alt="멍냥이랑" />
      </SLogo>
      <SUserMenu>
        {!member ? (
          <SLoginButton to={ROUTES.logIn}>로그인</SLoginButton>
        ) : (
          <SNotifyButton to={ROUTES.home}>
            <FaBell />
          </SNotifyButton>
        )}
      </SUserMenu>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  width: 100%;
  height: ${({ theme }) => theme.layouts.headerHeight};
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const SLogo = styled(Link)`
  flex-shrink: 0;
  padding-left: 8px;
  width: 128px;
  > img {
    display: block;
    width: 100%;
  }
`;

const SUserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const SLoginButton = styled(Link)`
  ${buttonStyle}
  margin-right: 8px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #fff;
`;

const SNotifyButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray400};
`;
