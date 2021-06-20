import { INotarius, IRegisterNotarius } from '../lib/types';
import axios from 'axios';
import { api } from '../lib/constants';
import { defaultResponseErrorHandler } from '../utils/defaultErrorHandler';


export const registerNotarius = async (values: IRegisterNotarius): Promise<boolean> => {
  try {
    await axios.post(api.backendDomain + api.registerNotariusEndpoint, values);
    return true;
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return false;
  }
};

export const getNotaries = async () => {
  try {
    const notaries = await axios.get(api.backendDomain + api.getNotariesEndpoint);
    return notaries.data as INotarius[];
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return [];
  }
};
export const getNotariusByID = async (id: string) => {
  try {
    const notarius = await axios.get(api.backendDomain + '/notarius/' + id);
    return notarius.data as IRegisterNotarius;
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return null;
  }
};

export const updateNotarius = async (notarius: Partial<INotarius>) => {
  try {
    await axios.patch(api.backendDomain + '/notarius', notarius);
  } catch (err) {
    await defaultResponseErrorHandler(err);
  }
};
