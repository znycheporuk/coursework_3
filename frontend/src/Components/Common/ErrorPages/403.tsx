import { Button, Result } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  text?: string;
}

export const Page403: FC<Props> = (props) => {
  const history = useHistory();
  return (
    <Result
      status="403"
      title="403"
      subTitle={ props.text || 'У вас недостраньо прав доступу, щоб переглядати дану сторінку.' }
      extra={ [
        <Button key='previous' onClick={ () => history.goBack() }>На попередню сторінку</Button>,
        <Button key='home' type="primary" onClick={ () => history.push('/') }>На головну сторінку</Button>,
      ] }
    />
  );
};


