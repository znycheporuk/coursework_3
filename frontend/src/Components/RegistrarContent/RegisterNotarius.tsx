import React, { FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, DatePicker, Form, Input } from 'antd';
import { len, max, min, required } from '../../utils/validators';
import { defaultErrorHandler } from '../../utils/defaultErrorHandler';
import { registerNotarius } from '../../dal/notaries';
import { IRegisterNotarius } from '../../lib/types';
import { useHistory } from 'react-router-dom';
import { convertObjWithMomentFields } from '../../utils/convertObjWithMomentFields';
import { dateFormat } from '../../lib/constants';

export const RegisterNotarius: FC = () => {
  const [ form ] = useForm<IRegisterNotarius>();
  const history = useHistory()

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      convertObjWithMomentFields(values);

      const success = await registerNotarius(values);
      if (success) {
        form.submit();
        form.resetFields();
        history.push('/notaries')
      }
    } catch (err) {
      await defaultErrorHandler(err);
    }
  }

  return (
    <>
      <h2>Реєстрація нотаріуса</h2>
      <Form
        form={ form }
        layout="horizontal"
        name='register-notarius'
        requiredMark='optional'
      >
        <Form.Item name='username' label='Логін' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='fullName' label='Повне імʼя' rules={ [ required, min(3), max(30) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='certificateNumber' label='Номер сертифікату' rules={ [ required, len(8) ] }>
          <Input type='number'defaultValue={undefined}/>
        </Form.Item>
        <Form.Item name='organizationName' label='Назва організації' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='notarialRegion' label='Нотаріальний регіон' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='phoneNumber' label='Номер телефону' rules={ [ required, len(9)] }>
          <Input type='number' addonBefore='+380' defaultValue={undefined}/>
        </Form.Item>
        <Form.Item name='certificationDate' label='Дата видачі свідоцтва' rules={ [ required ] }>
          <DatePicker placeholder='' format={ dateFormat }/>
        </Form.Item>
        <Form.Item name='cardDate' label='Дата видачі посвідчення' rules={ [ required ] }>
          <DatePicker placeholder='' format={ dateFormat }/>
        </Form.Item>
        <Form.Item name='districtRegistrationDate' label='Дата реєстрації округу' rules={ [ required ] }>
          <DatePicker placeholder='' format={ dateFormat }/>
        </Form.Item>
        <Form.Item name='place' label='Місцезнаходження' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='region' label='Регіон' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='password' label='Пароль' rules={ [ required, min(6), max(32) ] }>
          <Input.Password/>
        </Form.Item>

        <Button type='primary' onClick={ onOk }>Зареєструвати</Button>

      </Form>

    </>
  );
};
