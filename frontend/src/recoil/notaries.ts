import { selector } from 'recoil';
import { INotarius } from '../lib/types';
import { getNotaries } from '../dal/notaries';
import { roleSelector } from './auth';

export const notariesSelector = selector<INotarius[]>({
  key: 'notaries',
  get: async ({ get }) => {
    if (get(roleSelector) === 'registrar') {
      return await getNotaries();
    }
    return [];
  },
  set: ({ reset }) => {
    reset(notariesSelector);
  },
});


