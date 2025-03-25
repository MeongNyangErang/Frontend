import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GrHomeRounded } from 'react-icons/gr';
import { IoSearch } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import ROUTES from '@constants/routes';

const Nav = () => {
  return (
    <SNav>
      <SNavLink to={ROUTES.home}>
        <GrHomeRounded />
        <span>홈</span>
      </SNavLink>
      <SNavLink to={ROUTES.search} className="search">
        <IoSearch />
        <span>검색</span>
      </SNavLink>
      <SNavLink to={ROUTES.chat.list}>
        <FaRegMessage />
        <span>채팅</span>
      </SNavLink>
      <SNavLink to={ROUTES.myPage.user}>
        <FaRegUser />
        <span>MY</span>
      </SNavLink>
    </SNav>
  );
};

export default Nav;

const SNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 0 32px;
  height: ${({ theme }) => theme.layouts.navHeight};
  background-color: #fff;
  box-shadow: 0 -2px 6px rgba(100, 100, 100, 0.04);
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
