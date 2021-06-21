import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { isAuthSelector } from '../../recoil/auth';
import { signOut } from '../../dal/auth';
import { Menu, message } from 'antd';
import { NavLink } from 'react-router-dom';

export const AuthMenu: FC = () => {
  const [ isAuth, setIsAuth ] = useRecoilState(isAuthSelector);

  const onSignOut = async () => {
    try {
      const success = await signOut();
      if (success) {
        setIsAuth(false);
        window.location.reload()
      } else {
        message.error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Menu mode='horizontal' theme='dark' style={ { position: 'absolute', right: '20px' } }>
      { isAuth ?
        <>
          <Menu.Item key='signOut'><NavLink to='/sign-in' onClick={ onSignOut }>Вийти</NavLink></Menu.Item>
        </>
        :
        <>
          <Menu.Item key='signIn'><NavLink to='/sign-in'>Увійти</NavLink></Menu.Item>
          {/*<Menu.Item key='signUp'><NavLink to='/sign-up'>Зареєструватися</NavLink></Menu.Item>*/}
        </>
      }
    </Menu>
  );
};