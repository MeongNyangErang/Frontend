import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const PrivateRoute = lazy(() => import('@components/common/PrivateRoute'));
const PublicRoute = lazy(() => import('@components/common/PublicRoute'));
const MainLayout = lazy(() => import('@components/layouts/MainLayout'));
const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const UserSignUp = lazy(() => import('@pages/UserSignUp'));
const HostSignUp = lazy(() => import('@pages/host/HostSignUp'));

const AppRouter = () => {
  return (
    <Suspense fallback="lazy loading...">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* 마이페이지등 private route가 들어가는 영역 */}
        </Route>
        <Route element={<PublicRoute />}>
          {/* 로그인, 회원가입등 public route가 들어가는 영역 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup/user" element={<UserSignUp />} />
          <Route path="/signup/host" element={<HostSignUp />} />
        </Route>
        <Route path="*" element="Not Found" />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
