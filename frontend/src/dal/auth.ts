import axios from 'axios';
import { api } from '../lib/constants';
import { defaultResponseErrorHandler } from '../utils/defaultErrorHandler';
import { SignInValues, SignUpValues } from '../lib/types';

export const signOut = async (): Promise<boolean> => {
  try {
    await axios.get(api.backendDomain + api.signOutEndpoint);
    return true;
  } catch (err) {
    await defaultResponseErrorHandler(err);
    return false;
  }
};

export const signIn = async (values: SignInValues) => {
  try {
    const response = await axios.post(api.backendDomain + api.signInEndpoint, values);
    return response.data;
  } catch (err) {
    await defaultResponseErrorHandler(err);
  }
};

export const signUp = async (values: SignUpValues) => {
  try {
    const response = await axios.post(api.backendDomain + api.signUpEndpoint, values);
    return response.data;
  } catch (err) {
    await defaultResponseErrorHandler(err);
  }
};



