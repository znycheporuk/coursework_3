import React, { FC } from 'react';
import { RegisterNotarius } from './Components/AdminContent/RegisterNotarius';
import './App.less';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { CustomRoute } from './Components/Common/CustomRoute';
import { Header } from './Components/Header/Header';
import { Page404 } from './Components/Common/ErrorPages/404';
import { PowerOfAttorney } from './Components/RegistrarContent/PowerOfAttorney';
import { SignIn } from './Components/Auth/SignIn';
import { SignUp } from './Components/Auth/SignUp';
import { Notaries } from './Components/AdminContent/Notaries';
import { UpdateNotarius } from './Components/AdminContent/UpdateNotarius';

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
              <CustomRoute path='/register-notarius' anonymous={ RegisterNotarius } registrar={ RegisterNotarius }/>
              <CustomRoute path='/notaries' anonymous={ Notaries } registrar={ Notaries }/>
              <CustomRoute path='/register-power-of-attorney' anonymous={ PowerOfAttorney }/>
              <CustomRoute path='/sign-in' anonymous={ SignIn }/>
              <CustomRoute path='/sign-up' anonymous={ SignUp }/>
              <Route path="/update-notarius/:id">
                <UpdateNotarius/>
              </Route>
              <Route><Page404/></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>

  );
};
