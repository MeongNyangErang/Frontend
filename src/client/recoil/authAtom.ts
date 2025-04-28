import { atom } from 'recoil';
import { AppMember } from '@typings/member';

interface MemberState {
  data: null | AppMember;
  authLoading: boolean;
}

export const memberAtom = atom<MemberState>({
  key: 'member',
  default: {
    data: null,
    authLoading: true,
  },
});
