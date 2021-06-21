import React, { FC } from 'react';
import { RegisterNotarius } from './Components/RegistrarContent/RegisterNotarius';
import './App.less';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { CustomRoute } from './Components/Common/CustomRoute';
import { Header } from './Components/Header/Header';
import { Page404 } from './Components/Common/ErrorPages/404';
import { RegisterPowerOfAttorney } from './Components/NotariusContent/RegisterPowerOfAttorney';
import { SignIn } from './Components/Auth/SignIn';
import { SignUp } from './Components/Auth/SignUp';
import { Notaries } from './Components/RegistrarContent/Notaries';
import { UpdateNotarius } from './Components/RegistrarContent/UpdateNotarius';
import { PowerOfAttorneyTable } from './Components/NotariusContent/PowerOfAttorneyTable';
import { PowerOfAttorney } from './Components/NotariusContent/PowerOfAttorney';

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
              <CustomRoute path='/register-notarius' registrar={ RegisterNotarius }/>
              <CustomRoute path='/notaries' registrar={ Notaries }/>
              <CustomRoute path="/update-notarius/:id" registrar={ UpdateNotarius }/>
              <CustomRoute path='/register-power-of-attorney' notarius={ RegisterPowerOfAttorney }/>
              <CustomRoute path='/power-of-attorney-table' notarius={ PowerOfAttorneyTable }/>
              <CustomRoute path='/sign-in' anonymous={ SignIn }/>
              <CustomRoute path='/sign-up' anonymous={ SignUp }/>

              <Route path='/power-of-attorney/:series/:number' component={ PowerOfAttorney }/>
              <Route><Page404/></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
