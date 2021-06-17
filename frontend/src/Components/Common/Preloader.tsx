import React, { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Loader: FC = () => {
  return (
    <div className="spinner">
      <Spin indicator={ <LoadingOutlined style={ { fontSize: '2rem' } } spin/> } tip="Loading..."/>
    </div>
  );
};