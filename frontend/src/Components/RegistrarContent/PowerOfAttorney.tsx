import React, { FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input } from 'antd';
import { defaultErrorHandler } from '../../utils/defaultErrorHandler';


export const PowerOfAttorney: FC = () => {
  const [ form ] = useForm();
  const onOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      form.submit();
      form.resetFields();
    } catch (err) {
      await defaultErrorHandler(err);
    }
  };
  return (
    <Form form={ form } layout='horizontal' name='powerOfAttorney'>

      <Form.Item label='Серія' name='series'>
        <Input/>
      </Form.Item>
      <Form.Item label='Номер' name='number'>
        <Input/>
      </Form.Item>
      <Form.Item label='Iltyn' name='series'>
        <Input/>
      </Form.Item>
      <Form.Item label='Номер' name='number'>
        <Input/>
      </Form.Item>

      <Button type='primary' onClick={ onOk }>Підтвердити</Button>

    </Form>
  );
};