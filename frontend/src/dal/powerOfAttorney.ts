import { IPowerOfAttorney, IPowerOfAttorneyWithNotariusData } from '../lib/types';
import axios from 'axios';
import { api } from '../lib/constants';
import { defaultResponseErrorHandler } from '../utils/defaultErrorHandler';


export const registerPowerOfAttorney = async (values: IPowerOfAttorney): Promise<boolean> => {
  try {
    await axios.post(api.backendDomain + '/register-power-of-attorney', values);
    return true;
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return false;
  }
};

export const getPowersOfAttorney = async () => {
  try {
    const PoA = await axios.get(api.backendDomain + '/power-of-attorney');
    return PoA.data as IPowerOfAttorneyWithNotariusData[];
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return [];
  }
};

export const getPowerOfAttorneyBySerialNumber = async (series: string, number: number) => {
  try {
    const PoA = await axios.get(api.backendDomain + '/power-of-attorney/' + series + '/' + number);
    return PoA.data as IPowerOfAttorneyWithNotariusData;
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return null;
  }
};

export const updatePowerOfAttorney = async (PoA: Partial<IPowerOfAttorney>) => {
  try {
    await axios.patch(api.backendDomain + '/update-power-of-attorney', PoA);
  } catch (err) {
    await defaultResponseErrorHandler(err);
  }
};
