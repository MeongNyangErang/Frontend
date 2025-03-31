import { MEMBER_KEYS, MEMBER_ROLES } from '@constants/member';

export type MemberRole = (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];
type Member<T extends MemberRole> = {
  [MEMBER_KEYS.ID]: string;
  [MEMBER_KEYS.ROLE]: T;
  [MEMBER_KEYS.EMAIL]: string;
  [MEMBER_KEYS.STATUS]: string;
};

export type UserMember = Member<'user'>;
export type HostMember = Member<'host'>;

export type AppMember = UserMember | HostMember;
