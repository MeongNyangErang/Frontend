import { MEMBER_KEYS, MEMBER_ROLES } from '@constants/member';

export type MemberRole = (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];

type Member<T extends MemberRole> = {
  [MEMBER_KEYS.ROLE]: T;
  [MEMBER_KEYS.EMAIL]: string;
};

export type UserMember = Member<'USER'>;
export type HostMember = Member<'HOST'>;

export type AppMember = UserMember | HostMember;
