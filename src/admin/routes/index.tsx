import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const PrivateRoute = lazy(
  () => import('@admin/components/common/PrivateRoute'),
);
const Login = lazy(() => import('@admin/pages/Login'));
const DashBoard = lazy(() => import('@admin/pages/DashBoard'));
const NoticeList = lazy(() => import('@admin/pages/notices/NoticeList'));
const NoticeCreate = lazy(() => import('@admin/pages/notices/NoticeCreate'));
const NoticeEdit = lazy(() => import('@admin/pages/notices/NoticeEdit'));

const AdminRouter = () => {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="notices" element={<NoticeList />} />
          <Route path="notices/new" element={<NoticeCreate />} />
          <Route path="notices/:noticeId/edit" element={<NoticeEdit />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;
