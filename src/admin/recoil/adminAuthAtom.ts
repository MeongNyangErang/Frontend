import { atom } from 'recoil';
import { AdminUser } from '@admin/typings/adminAuth';

interface AdminAuthState {
  authLoading: boolean;
  data: AdminUser | null;
}

export const adminAuthAtom = atom<AdminAuthState>({
  key: 'adminAuth',
  default: {
    authLoading: true,
    data: null,
  },
});
