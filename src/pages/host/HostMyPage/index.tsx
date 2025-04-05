import { NavLink } from 'react-router-dom';
import useLogout from '@hooks/auth/useLogout';
import ROUTES from '@constants/routes';

const HostMyPage = () => {
  const { logout } = useLogout('host');
  return (
    <>
      호스트유저 마이페이지
      <br />
      <button onClick={logout}>로그아웃</button>
      <br />
      <NavLink to={ROUTES.myPage.host.registerAccommodation}>
        숙소 등록하기
      </NavLink>
      <br />
      <NavLink to={ROUTES.myPage.host.registerRoom}>객실 등록하기</NavLink>
    </>
  );
};

export default HostMyPage;
