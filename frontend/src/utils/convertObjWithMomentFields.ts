import { dateFormat } from '../lib/constants';

export const convertObjWithMomentFields = (obj: Record<string, any>) => {
  for (const [ key, value ] of Object.entries(obj)) {
    if (value._isAMomentObject) {
      obj[key] = value.format(dateFormat);
    }
  }
};