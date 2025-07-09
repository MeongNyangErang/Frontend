import { GrHomeRounded } from 'react-icons/gr';
import { IoSearch } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { FaRegUser, FaListUl } from 'react-icons/fa';
import ROUTES from '@constants/routes';
import useAuth from '@hooks/auth/useAuth';
import { SNav, SNavLink } from './styles';

const mobileMenu = [
  { name: '홈', path: ROUTES.home, icon: <GrHomeRounded /> },
  { name: '공지', path: ROUTES.notice.list, icon: <FaListUl /> },
  { name: '검색', path: ROUTES.search, icon: <IoSearch /> },
  { name: '채팅', path: ROUTES.chat.list, icon: <FaRegMessage /> },
  { name: 'MY', path: ROUTES.myPage.user.root, icon: <FaRegUser /> },
] as const;

const MobileNav = () => {
  const {
    member: { data },
  } = useAuth();

  const isMember = !!data;
  return (
    <SNav>
      {mobileMenu.map(({ name, path, icon }) => {
        // const isHostMyPage = data.role === 'HOST' && name === 'MY';
        return (
          <SNavLink key={name} to={path}>
            {icon}
            <span>{name}</span>
          </SNavLink>
        );
      })}
    </SNav>
  );
};

export default MobileNav;
