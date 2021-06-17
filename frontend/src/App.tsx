import React, { FC } from 'react';
import { RegisterRegistrar } from './Components/AdminContent/RegisterRegistrar';
import './App.less';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { CustomRoute } from './Components/Common/CustomRoute';
import { Header } from './Components/Header/Header';
import { Page404 } from './Components/Common/ErrorPages/404';
import { PowerOfAttorney } from './Components/RegistrarContent/PowerOfAttorney';
import { SignIn } from './Components/Auth/SignIn';
import { SignUp } from './Components/Auth/SignUp';

const { Content } = Layout;

export const App: FC = () => {
  return (
    <Layout style={ { minHeight: '100vh' } }>
      <Header/>
      <Layout>
        <Layout>
          <Content className='App'>
            <Switch>
              <Route exact path='/'/>
              <CustomRoute path='/register-registrar' registrar={ RegisterRegistrar }/>
              <CustomRoute path='/register-power-of-attorney' anonymous={ PowerOfAttorney }/>
              <CustomRoute path='/sign-in' anonymous={ SignIn }/>
              <CustomRoute path='/sign-up' anonymous={ SignUp }/>
              <Route><Page404/></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>

  );
};
