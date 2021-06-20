import { Layout, Menu } from 'antd';
import React, { FC } from 'react';
import './Header.less';
import { AuthMenu } from './AuthMenu';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roleSelector } from '../../recoil/auth';


export const Header: FC = () => {
  const role = useRecoilValue(roleSelector);

  return (
    <Layout.Header className='main-header' style={ { display: 'flex', justifyContent: 'space-between' } }>
      <Menu mode='horizontal' theme='dark'>
        <Menu.Item>
          <NavLink to='/'>Головна сторінка</NavLink>
        </Menu.Item>
        {/*{ role === 'registrar' &&*/ }
        <Menu.Item>
          <NavLink to='/register-notarius'>Зареєструвати нотаріуса</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/notaries'>Нотаріуси</NavLink>
        </Menu.Item>
        {/*}*/ }

      </Menu>
      <AuthMenu/>

    </Layout.Header>
  );
};

