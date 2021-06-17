import { UserSignUpData } from '../lib/types';
import axios from 'axios';
import { api } from '../lib/constants';
import { defaultResponseErrorHandler } from '../utils/defaultErrorHandler';


export const registerRegistrar = async (values: UserSignUpData): Promise<number> => {
  try {
    const response = await axios.post(api.backendDomain + api.registerRegistrarEndpoint, values);
    return response.data.id;
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return -1;
  }
};