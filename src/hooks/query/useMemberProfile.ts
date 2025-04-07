import useHostProfile from './host/useHostProfile';
import useUserProfile from './user/useUserProfile';
import { MemberRole } from '@typings/member';

const useMemberProfile = (memberId: string, role: MemberRole) => {
  return role === 'user' ? useUserProfile(memberId) : useHostProfile(memberId);
};

export default useMemberProfile;
