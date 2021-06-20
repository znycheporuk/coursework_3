import { Rule } from 'antd/lib/form';

export const required: Rule = {
  required: true,
  message: 'Обовʼязкове поле',
};

export const email: Rule = {
  type: 'email',
  message: 'Невірний формат електронної пошти',
};

export const min = (value: number): Rule => ({
  min: value,
  message: `Повинно містити хоча б ${ value } символів.`,
});

export const max = (value: number): Rule => ({
  max: value,
  message: `Повинно містити максимум ${ value } символів.`,
});

export const len = (value: number): Rule => ({
  len: value,
  message: `Повинно містити ${ value } символів.`,
});
