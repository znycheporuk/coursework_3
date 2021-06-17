import { Layout } from 'antd';
import React, { FC } from 'react';
import './Header.less';
import { AuthMenu } from './AuthMenu';


export const Header: FC = () => {
  return (
    <Layout.Header className='main-header'>
      <AuthMenu/>
    </Layout.Header>
  );
};

