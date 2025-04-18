import { useNavigate } from 'react-router-dom';
import { FaRegBell, FaBell } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import ROUTES from '@constants/routes';
import Button from '@components/common/Button';
import useAuth from '@hooks/auth/useAuth';
import { SUserMenu, SUserButton, SMyPageButton, SNotifyButton } from './styles';

const userMenu = [
  { name: '1:1 문의', path: ROUTES.chat.list, icon: <FaRegMessage /> },
  { name: '내 알림', path: ROUTES.notification, icon: <FaRegBell /> },
] as const;

const UserMenu = () => {
  const {
    member: { data, authLoading },
  } = useAuth();
  const navigate = useNavigate();
  const isHost = data?.role === 'HOST';
  const myPagePath = isHost ? ROUTES.myPage.host.root : ROUTES.myPage.user.root;

  if (authLoading) return null;

  return (
    <SUserMenu>
      {!data ? (
        <Button
          onClick={() => navigate(ROUTES.logIn)}
          fontSize="14px"
          variant="grayBorder"
        >
          로그인
        </Button>
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
