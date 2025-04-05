import useLogout from '@hooks/auth/useLogout';

const MyPage = () => {
  const { logout } = useLogout('host');
  return (
    <>
      일반유저 마이페이지
      <br />
      <button onClick={logout}>로그아웃</button>
    </>
  );
};

export default MyPage;
