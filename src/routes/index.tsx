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
const UserReservationList = lazy(
  () => import('@pages/user/UserReservationList'),
);
const UserReviews = lazy(() => import('@pages/user/UserReviews'));
const UserWishList = lazy(() => import('@pages/user/UserWishList'));
const HostMyPage = lazy(() => import('@pages/host/HostMyPage'));
const RegisterAccommodation = lazy(
  () => import('@pages/host/HostRegister/RegisterAccommodation'),
);
const RegisterRoom = lazy(
  () => import('@pages/host/HostRegister/RegisterRoom'),
);
const HostRoomList = lazy(() => import('@pages/host/HostList/RoomList'));
const DetailAccommodation = lazy(
  () => import('@pages/Accommodation/DetailAccommodation'),
);

const Search = lazy(() => import('@pages/Search'));
const DetailRoom = lazy(() => import('@pages/Accommodation/DetailRoom'));
const AccommodationReview = lazy(
  () => import('@pages/Accommodation/RoomReview'),
);
const Reservation = lazy(() => import('@pages/Accommodation/Reservation'));
const Chat = lazy(() => import('@pages/Chat/index'));
const RecommendNonMember = lazy(
  () => import('@components/common/RecommendNonMember'),
);
const RecommendNonMemberView = lazy(
  () => import('@components/common/RecommendNonMember/AllView'),
);
const RecommendMember = lazy(
  () => import('@components/common/RecommendMember'),
);
const RecommendMostView = lazy(
  () => import('@components/common/RecommendMember/MostView'),
);
const RecommendLastView = lazy(
  () => import('@components/common/RecommendMember/LastView'),
);
const RecommendMemberView = lazy(
  () => import('@components/common/RecommendMember/AllView'),
);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* 메인레이아웃 적용 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route
            path="accommodation/:accommodationId"
            element={<DetailAccommodation />}
          />
          <Route
            path="accommodation/:accommodationId/room/:roomId"
            element={<DetailRoom />}
          />
          <Route
            path="accommodation/:accommodationId/reservation"
            element={<Reservation />}
          />
          <Route
            path="accommodation/:accommodationId/review"
            element={<AccommodationReview />}
          />
          <Route
            path="common/recommendnonmember"
            element={<RecommendNonMember />}
          />
          <Route
            path="common/recommendnonmember/AllView"
            element={<RecommendNonMemberView />}
          />
          <Route path="common/recommendmember" element={<RecommendMember />} />
          <Route
            path="common/recommendmember/mostView"
            element={<RecommendMostView />}
          />
          <Route
            path="common/recommendmember/lastView"
            element={<RecommendLastView />}
          />
          <Route
            path="common/recommendmember/AllView"
            element={<RecommendMemberView />}
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
                path="register-accommodation"
                element={<RegisterAccommodation />}
              />
              <Route path="register-room" element={<RegisterRoom />} />
              <Route path="room-list" element={<HostRoomList />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute allowedRoles={['host', 'user']} />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:chatRoomId" element={<Chat />} />
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
