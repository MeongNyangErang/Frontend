import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '@components/styles/responsive';

const SNav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  padding: 0 32px;
  height: ${({ theme }) => theme.layouts.mobileNavHeight};
  background-color: #fff;
  box-shadow: 0 -2px 6px rgba(100, 100, 100, 0.04);

  ${media.tablet} {
    display: none;
  }
`;

const SNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 4px;
  padding: 0 16px;
  font-size: 20px;

  &.search {
    row-gap: 1px;
    font-size: 23px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.main};
  }

  > span {
    font-size: 12px;
  }
`;

export { SNav, SNavLink };
