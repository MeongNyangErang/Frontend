import useAuth from '@hooks/auth/useAuth';
import { FaRegBell, FaBell } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import ROUTES from '@constants/routes';
import {
  SUserMenu,
  SUserButton,
  SMyPageButton,
  SLoginButton,
  SNotifyButton,
} from './styles';

const userMenu = [
  { name: '숙소 문의', path: ROUTES.chat.list, icon: <FaRegMessage /> },
  { name: '내 알림', path: ROUTES.notification, icon: <FaRegBell /> },
] as const;

const UserMenu = () => {
  const { member } = useAuth();
  const isHost = member?.role === 'host';
  const myPagePath = isHost ? ROUTES.myPage.host.root : ROUTES.myPage.user.root;

  return (
    <SUserMenu>
      {!member ? (
        <SLoginButton to={ROUTES.logIn}>로그인</SLoginButton>
      ) : (
        <>
          {userMenu.map(({ name, path, icon }) => {
            return (
              <SUserButton key={name} to={path}>
                {icon}
                {name}
              </SUserButton>
            );
          })}
          <SMyPageButton to={myPagePath}>MY 페이지</SMyPageButton>
          <SNotifyButton to={ROUTES.notification}>
            <FaBell />
          </SNotifyButton>
        </>
      )}
    </SUserMenu>
  );
};

export default UserMenu;
