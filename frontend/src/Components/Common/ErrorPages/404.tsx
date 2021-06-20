import { Button, Result } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  text?: string;
}

export const Page404: FC<Props> = (props) => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle={ props.text || 'Такої сторінки не існує.' }
      extra={ [
        <Button key='previous' onClick={ () => history.goBack() }>На попередню сторінку</Button>,
        <Button key='home' type="primary" onClick={ () => history.push('/') }>На головну сторінку</Button>,
      ] }
    />
  );
};


