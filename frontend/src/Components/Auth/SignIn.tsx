import React, { FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input } from 'antd';
import { min, required } from '../../utils/validators';
import { signIn } from '../../dal/auth';
import { useHistory } from 'react-router-dom';
import { SignInValues } from '../../lib/types';
import { useRecoilState } from 'recoil';
import { userDataAtom } from '../../recoil/auth';


export const SignIn: FC = () => {
  const [ form ] = useForm<SignInValues>();
  const history = useHistory();
  const [ , setUserData ] = useRecoilState(userDataAtom);

  const onSubmit = async () => {
    const values = await form.validateFields();
    const response = await signIn(values);
    if (response) {
      setUserData(response);
      form.submit();
      form.resetFields();
      history.push('/');
    }
  };

  return (
    <Form form={ form } name='sign-in' layout='horizontal' requiredMark='optional'>
      <Form.Item name='username' label='Логін' rules={ [ required, min(6) ] }>
        <Input/>
      </Form.Item>
      <Form.Item name='password' label='Пароль' rules={ [ required, min(6) ] }>
        <Input/>
      </Form.Item>
      <Button type='primary' onClick={ onSubmit }>Увійти</Button>
    </Form>
  );
};