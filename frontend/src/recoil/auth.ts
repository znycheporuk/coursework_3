import { atom, selector } from 'recoil';
import { UserRoles } from '../lib/types';

interface UserData {
  id: string,
  username: string,
  role: UserRoles
}

export const userDataAtom = atom<UserData | null>({
  key: 'userData',
  default: null,
});

export const roleSelector = selector<UserRoles | null>({
  key: 'role',
  get: ({ get }) => {
    const user = get(userDataAtom);
    return user?.role ?? null;
  },
});

export const userIdSelector = selector<string>({
  key: 'userId',
  get: ({ get }) => {
    const user = get(userDataAtom);
    return user?.id ?? '';
  },
});

export const isAuthSelector = selector<boolean>({
  key: 'isAuth',
  get: ({ get }) => {
    return !!get(userDataAtom);
  },
  set: ({ reset }, value) => {
    if (!value) {
      reset(userDataAtom);
    }
  },
});


