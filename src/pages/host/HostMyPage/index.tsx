import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import ProfileBox from '@components/common/myPage/ProfileBox';
import MyPageOverview from '@components/common/myPage/MyPageOverview';
import ROUTES from '@constants/routes';

const HostMyPage = () => {
  const { member } = useAuth();

  if (!member || member.role !== 'host') return <Navigate to={ROUTES.home} />;
  return (
    <>
      <ProfileBox
        memberId={member.id}
        role={member.role}
        email={member.email}
      />
      <MyPageOverview role={member.role} />
    </>
  );
};

export default HostMyPage;
