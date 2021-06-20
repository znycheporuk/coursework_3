import React, { FC, useEffect, useState } from 'react';
import { getNotariusByID, updateNotarius } from '../../dal/notaries';
import { IRegisterNotarius } from '../../lib/types';
import { useHistory, useParams } from 'react-router-dom';
import { Button, DatePicker, Form, Input } from 'antd';
import moment from 'moment';
import { len, max, min, required } from '../../utils/validators';
import { Loader } from '../Common/Preloader';
import { useForm } from 'antd/lib/form/Form';
import { defaultErrorHandler } from '../../utils/defaultErrorHandler';

const dateFormat = 'DD.MM.YYYY';

const convertObjWithMomentFields = (obj: Record<string, any>) => {
  for (const [ key, value ] of Object.entries(obj)) {
    if (value._isAMomentObject) {
      obj[key] = value.format(dateFormat);
    }
  }
};

export const UpdateNotarius: FC = () => {
  const [ notariusData, setNotariusData ] = useState<IRegisterNotarius | null>(null);
  const { id } = useParams<{ id: string }>();
  const [ form ] = useForm<IRegisterNotarius>();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setNotariusData(await getNotariusByID(id));
    })();
  }, []);

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      convertObjWithMomentFields(values);

      await updateNotarius(values);
      form.submit();
      form.resetFields();
      history.push('/notaries');
    } catch (err) {
      await defaultErrorHandler(err);
    }
  };
  if (!notariusData) {
    return <Loader/>;
  }
  return (
    <>
      <h2>Редагування нотаріуса</h2>
      <Form
        form={ form }
        layout="horizontal"
        name='update-notarius'
        requiredMark='optional'
        initialValues={  {
          ...notariusData,
          certificationDate: moment(notariusData.certificationDate, dateFormat),
          cardDate: moment(notariusData.cardDate, dateFormat),
          districtRegistrationDate: moment(notariusData.districtRegistrationDate, dateFormat),
        } }
      >
        <Form.Item name='username' label='Логін' rules={ [ required, min(5), max(20) ] }>
          <Input disabled/>
        </Form.Item>
        <Form.Item name='fullName' label='Повне імʼя' rules={ [ required, min(3), max(30) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='certificateNumber' label='Номер сертифікату' rules={ [ required, len(8) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='organizationName' label='Назва організації' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='notarialRegion' label='Нотаріальний регіон' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item name='phoneNumber' label='Номер телефону' rules={ [ required, len(13) ] }>
          <Input/>
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

        <Button type='primary' onClick={ onOk }>Зберегти</Button>

      </Form>

    </>
  );
};
