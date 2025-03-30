import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const PrivateRoute = lazy(() => import('@components/common/PrivateRoute'));
const PublicRoute = lazy(() => import('@components/common/PublicRoute'));
const MainLayout = lazy(() => import('@components/layouts/MainLayout'));
const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const UserSignUp = lazy(() => import('@pages/UserSignUp'));
const HostSignUp = lazy(() => import('@pages/host/HostSignUp'));
const Accommodation = lazy(() => import('@pages/mypage/host/Accommodation'));

const AppRouter = () => {
  return (
    <Suspense fallback="lazy loading...">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
<<<<<<< HEAD
        <Route element={<PrivateRoute />}>
          {/* 마이페이지등 private route가 들어가는 영역 */}
          <Route path="/mypage/host" element={<Accommodation />} />
=======
        <Route element={<PrivateRoute allowedRoles={['user']} />}>
          {/* 일반유저만 접근 가능한 영역 */}
        </Route>
        <Route element={<PrivateRoute allowedRoles={['host']} />}>
          {/* 호스트 유저만 접근 가능한 영역 */}
>>>>>>> 0ca25f29e7c4e1fe114ae8f076b5d51aed29ea65
        </Route>
        <Route element={<PublicRoute />}>
          {/* 게스트만 접근 가능한 영역 */}
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
