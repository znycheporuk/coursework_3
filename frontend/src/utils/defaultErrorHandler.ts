import { message } from 'antd';

export const defaultErrorHandler = async (err: Error) => {
  console.log(err);
  await message.error(err.message);
};
export const defaultResponseErrorHandler = async (err: any) => {
  debugger
  err = err.response;
  console.log(err);
  await message.error(err.data.message);
};