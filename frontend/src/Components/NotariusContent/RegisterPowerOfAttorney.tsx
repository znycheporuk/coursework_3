import React, { FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, DatePicker, Form, Input } from 'antd';
import { defaultErrorHandler } from '../../utils/defaultErrorHandler';
import { IPowerOfAttorney } from '../../lib/types';
import { len, max, min, required } from '../../utils/validators';
import { dateFormat } from '../../lib/constants';
import { registerPowerOfAttorney } from '../../dal/powerOfAttorney';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';
import { userIdSelector } from '../../recoil/auth';
import { convertObjWithMomentFields } from '../../utils/convertObjWithMomentFields';


export const RegisterPowerOfAttorney: FC = () => {
  const [ form ] = useForm<IPowerOfAttorney>();
  const id = useRecoilValue(userIdSelector);
  const history = useHistory();
  const onOk = async () => {
    try {
      const values = await form.validateFields();
      convertObjWithMomentFields(values);
      const success = await registerPowerOfAttorney({ ...values, notariusId: id, active: true });
      if (success) {
        form.submit();
        form.resetFields();
        history.push('/');
      }
    } catch (err) {
      await defaultErrorHandler(err);
    }
  };
  return (
    <>
      <h2>Зареєструвати довіреність</h2>
      <Form form={ form } layout='horizontal' name='powerOfAttorney' requiredMark='optional'>

        <Form.Item label='Серія' name='series' rules={ [ required, len(2) ] }>
          <Input/>
        </Form.Item>
        <Form.Item label='Номер' name='number' rules={ [ required, len(8) ] }>
          <Input type='number'/>
        </Form.Item>
        <Form.Item label='Кому видана' name='issuedTo' rules={ [ required, min(5), max(20) ] }>
          <Input/>
        </Form.Item>
        <Form.Item label='Ідентифікаційний номер' name='taxNumber' rules={ [ required, len(10) ] }>
          <Input type='number'/>
        </Form.Item>
        <Form.Item label='Дійсна до' name='validUntil' rules={ [ required ] }>
          <DatePicker placeholder='' format={ dateFormat }/>
        </Form.Item>
        <Form.Item label='Додаткова інформація' name='additionalInfo' rules={ [ required ] }>
          <Input.TextArea/>
        </Form.Item>

        <Button type='primary' onClick={ onOk }>Зареєструвати</Button>

      </Form>
    </>
  );
};
