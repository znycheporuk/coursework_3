import { message } from 'antd';
import { defaultErrorMessage } from '../lib/constants';

export const defaultErrorHandler = async (err: Error) => {
  await message.error(err.message || defaultErrorMessage);
};

export const defaultResponseErrorHandler = async (err: any) => {
  await message.error(err.response.data.message || defaultErrorMessage);
};
