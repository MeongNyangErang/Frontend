import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyle } from '@components/styles/mixins';
import { media } from '@components/styles/responsive';

const SHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: ${({ theme }) => `0 ${theme.layouts.paddingX}`};
  width: 100%;
  height: ${({ theme }) => theme.layouts.headerHeight};
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const SContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: ${({ theme }) => theme.layouts.innerWidth};
`;

const SNavArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SLogo = styled(Link)`
  flex-shrink: 0;
  width: 128px;

  > img {
    display: block;
    width: 100%;
  }
`;

const SMainNav = styled.div`
  display: none;

  ${media.tablet} {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const SNavItem = styled(NavLink)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const SUserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SLoginButton = styled(Link)`
  ${buttonStyle}
  background-color: ${({ theme }) => theme.colors.main};
  color: #fff;
`;

const SUserButton = styled(Link)`
  display: none;

  ${media.tablet} {
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${({ theme }) => theme.colors.gray700};
    letter-spacing: -1px;
    transition: ${({ theme }) => theme.transition.default};

    &:hover {
      color: ${({ theme }) => theme.colors.gray800};
    }

    > svg {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.gray600};
    }
  }
`;

const SMyPageButton = styled(Link)`
  display: none;
  ${media.tablet} {
    display: inline-block;
    padding: 6px 12px;
    color: #333;
    background-color: #fff;
    border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-radius: 8px;
    transition: ${({ theme }) => theme.transition.default};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
    }
  }
`;

const SNotifyButton = styled(Link)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray500};

  ${media.tablet} {
    display: none;
  }
`;

export {
  SHeader,
  SContainer,
  SNavArea,
  SMainNav,
  SNavItem,
  SLogo,
  SUserMenu,
  SLoginButton,
  SUserButton,
  SMyPageButton,
  SNotifyButton,
};
