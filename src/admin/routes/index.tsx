import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const PrivateRoute = lazy(
  () => import('@admin/components/common/PrivateRoute'),
);
const PublicRoute = lazy(() => import('@admin/components/common/PublicRoute'));
const MainLayout = lazy(() => import('@admin/components/layouts/MainLayout'));
const Login = lazy(() => import('@admin/pages/Login'));
const DashBoard = lazy(() => import('@admin/pages/DashBoard'));
const NoticeList = lazy(() => import('@admin/pages/notices/NoticeList'));
const NoticeDetail = lazy(() => import('@admin/pages/notices/NoticeDetail'));
const NoticeCreate = lazy(() => import('@admin/pages/notices/NoticeCreate'));
const NoticeEdit = lazy(() => import('@admin/pages/notices/NoticeEdit'));
const HostSignupRequestList = lazy(
  () => import('@admin/pages/hostSignup/HostSignupRequestList'),
);
const HostSignupRequestDetail = lazy(
  () => import('@admin/pages/hostSignup/HostSignupRequestDetail'),
);
const ReportList = lazy(() => import('@admin/pages/reports/ReportList'));
const ReportDetail = lazy(() => import('@admin/pages/reports/ReportDetail'));

const AdminRouter = () => {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="notices" element={<NoticeList />} />
            <Route path="notices/:noticeId" element={<NoticeDetail />} />
            <Route path="notices/new" element={<NoticeCreate />} />
            <Route path="notices/:noticeId/edit" element={<NoticeEdit />} />
            <Route path="hosts" element={<HostSignupRequestList />} />
            <Route path="hosts/:hostId" element={<HostSignupRequestDetail />} />
            <Route path="reports" element={<ReportList />} />
            <Route path="reports/:reportId" element={<ReportDetail />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;
