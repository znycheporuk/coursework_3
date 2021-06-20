import React, { FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input, Select } from 'antd';
import { min, required } from '../../utils/validators';
import { signUp } from '../../dal/auth';
import { useHistory } from 'react-router-dom';
import { SignUpValues } from '../../lib/types';
import { useRecoilState } from 'recoil';
import { userDataAtom } from '../../recoil/auth';


export const SignUp: FC = () => {
  const [ form ] = useForm<SignUpValues>();
  const history = useHistory();
  const [ , setUserData ] = useRecoilState(userDataAtom);

  const onSubmit = async () => {
    const values = await form.validateFields();
    const response = await signUp(values);
    if (response) {
      setUserData(response);
      form.submit();
      form.resetFields();
      history.push('/');
    }
  };

  return (
    <>
      <h2>Реєстрація</h2>
      <Form form={ form } name='sign-in' layout='horizontal' requiredMark='optional'>
        <Form.Item name='username' label='Логін' rules={ [ required, min(6) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='password' label='Пароль' rules={ [ required, min(6) ] }>
          <Input.Password/>
        </Form.Item>
        <Form.Item name='role' label='Роль' rules={ [ required ] }>
          <Select>
            <Select.Option value='registrar'>
              Реєстратор
            </Select.Option>
            <Select.Option value='notarius'>
              Нотаріус
            </Select.Option>
          </Select>
        </Form.Item>

        <Button type='primary' onClick={ onSubmit }>Зареєструватися</Button>
      </Form>
    </>
  );
};