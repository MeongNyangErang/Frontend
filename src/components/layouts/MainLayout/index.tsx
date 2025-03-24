import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <header>헤더영역</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터영역</footer>
      <nav>하단 고정 네비게이션 영역</nav>
    </>
  );
};

export default MainLayout;
