import useHostProfile from './host/useHostProfile';
import useUserProfile from './user/useUserProfile';
import { MemberRole } from '@typings/member';

const useMemberProfile = (role: MemberRole) => {
  return role === 'user' ? useUserProfile() : useHostProfile();
};

export default useMemberProfile;
