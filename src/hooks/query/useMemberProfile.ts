import useHostProfile from './useHostProfile';
import useUserProfile from './useUserProfile';
import { MemberRole } from '@typings/member';

const useMemberProfile = (memberId: string, role: MemberRole) => {
  return role === 'user' ? useUserProfile(memberId) : useHostProfile(memberId);
};

export default useMemberProfile;
