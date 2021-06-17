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
      subTitle={ props.text || 'Sorry, you are not authorized to access this page.' }
      extra={ [
        <Button key='previous' onClick={ () => history.goBack() }>Back to previous screen</Button>,
        <Button key='home' type="primary" onClick={ () => history.push('/') }>Back to home page</Button>,
      ] }
    />
  );
};


