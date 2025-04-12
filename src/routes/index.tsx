import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const LoadingPage = lazy(() => import('@pages/LoadingPage'));
const PrivateRoute = lazy(() => import('@components/common/PrivateRoute'));
const PublicRoute = lazy(() => import('@components/common/PublicRoute'));
const MainLayout = lazy(() => import('@components/layouts/MainLayout'));
const MyPageLayout = lazy(() => import('@components/layouts/MyPageLayout'));
const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const UserSignUp = lazy(() => import('@pages/user/UserSignUp'));
const HostSignUp = lazy(() => import('@pages/host/HostSignUp'));
const UserMyPage = lazy(() => import('@pages/user/UserMyPage'));
const UserMyPet = lazy(() => import('@pages/user/UserMyPet'));
const HostMyPage = lazy(() => import('@pages/host/HostMyPage'));
const Search = lazy(() => import('@pages/Search'));
const RegisterAccommodation = lazy(
  () => import('@pages/host/register/RegisterAccommodation'),
);
const RegisterRoom = lazy(() => import('@pages/host/register/RegisterRoom'));
const Reservation = lazy(
  () => import('@pages/Accommodation/${accommodationId}/reservation'),
);
const RoomList = lazy(() => import('@pages/host/register/RoomList'));
const DetailAccommodation = lazy(
  () => import('@pages/host/register/DetailAccommodation'),
);

const Chat = lazy(() => import('@pages/Chat/index'));
const UserReservationList = lazy(
  () => import('@pages/user/UserReservationList'),
);
const UserReviews = lazy(() => import('@pages/user/UserReviews'));
const UserWishList = lazy(() => import('@pages/user/UserWishList'));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* 메인레이아웃 적용 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route
            path="accommodation/:accommodationId/reservation"
            element={<Reservation />}
          />
          <Route
            path="register/accommodation"
            element={<RegisterAccommodation />}
          />
          <Route
            path="register/detailAccommodation"
            element={<DetailAccommodation />}
          />

          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path="/mypage/user" element={<MyPageLayout />}>
              <Route index element={<UserMyPage />} />
              <Route path="my-pet" element={<UserMyPet />} />
              <Route
                path="reservation-list"
                element={<UserReservationList />}
              />
              <Route path="reviews" element={<UserReviews />} />
              <Route path="wishlist" element={<UserWishList />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['host']} />}>
            <Route path="/mypage/host" element={<MyPageLayout />}>
              <Route index element={<HostMyPage />} />
              <Route
                path="register/room"
                element={<RegisterRoom mode="create" />}
              />

              <Route path="register/roomList" element={<RoomList />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['host', 'user']} />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:roomId" element={<Chat />} />
          </Route>
        </Route>

        {/* 메인레이아웃 미적용 */}
        <Route element={<PublicRoute />}>
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
