import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const PrivateRoute = lazy(() => import('@components/common/PrivateRoute'));
const PublicRoute = lazy(() => import('@components/common/PublicRoute'));
const MainLayout = lazy(() => import('@components/layouts/MainLayout'));
const MinimalLayout = lazy(() => import('@components/layouts/MinimalLayout'));
const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const UserSignUp = lazy(() => import('@pages/UserSignUp'));
const HostSignUp = lazy(() => import('@pages/host/HostSignUp'));
const UserMyPage = lazy(() => import('@pages/MyPage'));
const HostMyPage = lazy(() => import('@pages/host/HostMyPage'));
const Search = lazy(() => import('@pages/Search'));
const RegisterAccommodation = lazy(
  () => import('@pages/mypage/host/register/Accommodation'),
);
const RegisterRoom = lazy(() => import('@pages/mypage/host/register/Room'));
const Reservation = lazy(
  () => import('@pages/Accommodation/${accommodationId}/reservation'),
);

const AppRouter = () => {
  return (
    <Suspense fallback="lazy loading...">
      <Routes>
        {/* 메인레이아웃 적용 페이지 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route
            path="mypage/host/register/Accommodation"
            element={<RegisterAccommodation mode="create" />}
          />
          <Route path="mypage/host/register/Room" element={<RegisterRoom />} />
          <Route
            path="accommodation/${accommodationId}/reservation"
            element={<Reservation />}
          />

          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            {/* 일반유저만 접근 가능한 영역 */}
          </Route>
          <Route element={<PrivateRoute allowedRoles={['host']} />}>
            {/* 호스트 유저만 접근 가능한 영역 */}
          </Route>
          <Route element={<PrivateRoute allowedRoles={['user', 'host']} />}>
            {/* 로그인한 모든 유저 접근 가능한 영역 */}
          </Route>
        </Route>
        {/* 헤더, 네브바 미적용 페이지 */}
        <Route element={<MinimalLayout />}>
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            {/* 일반유저만 접근 가능한 영역 */}
            <Route path="/mypage/user" element={<UserMyPage />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['host']} />}>
            {/* 호스트 유저만 접근 가능한 영역 */}
            <Route path="/mypage/host" element={<HostMyPage />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['user', 'host']} />}>
            {/* 로그인한 모든 유저 접근 가능한 영역 */}
          </Route>
          <Route element={<PublicRoute />}>
            {/* 게스트만 접근 가능한 영역 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup/user" element={<UserSignUp />} />
            <Route path="/signup/host" element={<HostSignUp />} />
          </Route>
        </Route>
        <Route path="*" element="Not Found" />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
