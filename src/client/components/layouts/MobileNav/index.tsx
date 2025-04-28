import { GrHomeRounded } from 'react-icons/gr';
import { IoSearch } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import ROUTES from '@constants/routes';
import useAuth from '@hooks/auth/useAuth';
import { SNav, SNavLink } from './styles';

const mobileMenu = [
  { name: '홈', path: ROUTES.home, icon: <GrHomeRounded /> },
  { name: '검색', path: ROUTES.search, icon: <IoSearch /> },
  { name: '채팅', path: ROUTES.chat.list, icon: <FaRegMessage /> },
  { name: 'MY', path: ROUTES.myPage.user.root, icon: <FaRegUser /> },
] as const;

const MobileNav = () => {
  const {
    member: { data, authLoading },
  } = useAuth();

  if (!data) return null;

  return (
    <SNav>
      {mobileMenu.map(({ name, path, icon }) => {
        const isHostMyPage = data.role === 'HOST' && name === 'MY';
        return (
          <SNavLink
            key={name}
            to={!isHostMyPage ? path : ROUTES.myPage.host.root}
          >
            {icon}
            <span>{name}</span>
          </SNavLink>
        );
      })}
    </SNav>
  );
};

export default MobileNav;
