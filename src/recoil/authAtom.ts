import { atom } from 'recoil';
import { AppMember } from '@typings/member';

export const memberAtom = atom<null | AppMember>({
  key: 'member',
  default: null,
});
