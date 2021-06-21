import React, { FC, useState } from 'react';
import { IPowerOfAttorneyWithNotariusData } from '../../lib/types';
import { Button, Form, Input, Row } from 'antd';
import { len, required } from '../../utils/validators';
import { useForm } from 'antd/lib/form/Form';
import { PowerOfAttorney } from './PowerOfAttorney';
import { getPowerOfAttorneyBySerialNumber } from '../../dal/powerOfAttorney';
import { defaultErrorHandler } from '../../utils/defaultErrorHandler';

interface FormData {
  series: string,
  number: number
}

export const CheckPowerOfAttorney: FC = () => {
  const [ form ] = useForm<FormData>();

  const [ PoA, setPoA ] = useState<IPowerOfAttorneyWithNotariusData | null>(null);
  const [ data, setData ] = useState<FormData>({} as any);

  const onSearch = async () => {
    try {
      const values = await form.validateFields();
      setData(values);
      setPoA(await getPowerOfAttorneyBySerialNumber(values.series, Number(values.number)));
      form.submit();
    } catch (err) {
      setPoA(null);
      await defaultErrorHandler(err);
    }
  };
  return (
    <>
      <h2>Пошук довіреності</h2>
      <Form form={ form } layout='horizontal' name='checkPowerOfAttorney' requiredMark='optional'>

        <Form.Item label='Серія' name='series' rules={ [ required, len(2) ] }>
          <Input/>
        </Form.Item>
        <Form.Item label='Номер' name='number' rules={ [ required, len(8) ] }>
          <Input type='number'/>
        </Form.Item>
        <Row >
        <Button type='primary' onClick={ onSearch } style={{marginRight:'20px'}}>Шукати</Button>
        <Button onClick={ async () => {
          await form.resetFields();
          setPoA(null);
        } }>Очистити</Button>
        </Row>

      </Form>
      <br/>

      { PoA && <PowerOfAttorney series={ data.series } number={ data.number }/> }
    </>
  );
};
