import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ProfileBox from '@components/layouts/MyPageLayout/ProfileBox';
import MyPageOverview from '@components/layouts/MyPageLayout/MyPageOverview';
import ROUTES from '@constants/routes';

const HostMyPage = () => {
  const {
    member: { data },
  } = useAuth();

  if (!data || data.role !== 'host') return <Navigate to={ROUTES.home} />;
  return (
    <>
      <ProfileBox role={data.role} email={data.email} />
      <MyPageOverview role={data.role} />
    </>
  );
};

export default HostMyPage;
