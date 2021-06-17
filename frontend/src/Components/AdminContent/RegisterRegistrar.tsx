import React, { FC, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input, Radio } from 'antd';
import { required } from '../../utils/validators';
import { UserSignUpData } from '../../lib/types';
import { defaultErrorHandler } from '../../utils/defaultErrorHandler';
import { registerRegistrar } from '../../dal/admin';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { CopyOutlined } from '@ant-design/icons';

export const RegisterRegistrar: FC = () => {
  const [ form ] = useForm<UserSignUpData>();
  const [ dataType, setDataType ] = useState('IDN');
  const [ userId, setUserId ] = useState<number | null>(null);

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      if (dataType === 'IDN') {
        values.reasonOfAbsence = '';
      } else {
        values.IDN = '';
      }
      const id = await registerRegistrar(values);
      if (id === -1) {
        return;
      }
      setUserId(id);
      form.submit();
      form.resetFields();
    } catch (err) {
      await defaultErrorHandler(err);
      setUserId(123);
    }
  };

  return (
    <>
      <Form
        form={ form }
        layout="vertical"
        name="signOnForm"
        style={ { width: '500px', margin: 'auto' } }
      >
        { userId &&
        <Form.Item label='Ідентифікатор нового Реєстратора'>
          <Input.Search enterButton={ <CopyOutlined/> } onSearch={ (value) => copyToClipboard(value) }
                        value={ userId }/>
        </Form.Item>
        }
        <Form.Item
          name="person"
          rules={ [ required ] }>
          <Radio.Group>
            <Radio.Button value="individual">Фізична особа</Radio.Button>
            <Radio.Button value="legal">Юридична особа</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="name"
          rules={ [ required ] }>
          <Input placeholder='ПІБ/Назва'/>
        </Form.Item>

        <Form.Item>
          <Radio.Group
            defaultValue='IDN'
            onChange={ (event) => setDataType(event.target.value) }
          >
            <Radio.Button value="IDN">ІДН/ЄРДПОУ</Radio.Button>
            <Radio.Button value="reasonOfAbsence">Причина відсутності</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name={ dataType }>
          <Input placeholder={ dataType === 'IDN' ? 'ІДН/ЄРДПОУ' : 'Причина відсутності' }/>
        </Form.Item>

        <Button onClick={ onOk }>Зареєструватися</Button>

      </Form>

    </>
  );
};
