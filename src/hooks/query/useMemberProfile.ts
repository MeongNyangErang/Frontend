import { HostProfile, UserProfile } from '@typings/response/auth';
import useHostProfile from './host/useHostProfile';
import useUserProfile from './user/useUserProfile';
import { MemberRole } from '@typings/member';

const useMemberProfile = (
  role: MemberRole,
): {
  data: UserProfile | HostProfile | undefined;
  error: unknown;
  isLoading: boolean;
} => {
  return role === 'USER' ? useUserProfile() : useHostProfile();
};

export default useMemberProfile;
