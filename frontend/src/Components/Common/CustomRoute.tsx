import React, { ComponentType, FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Page403 } from './ErrorPages/403';
import { useRecoilValue } from 'recoil';
import { isAuthSelector, roleSelector } from '../../recoil/auth';

interface CustomRouteProps extends RouteProps {
  notarius?: ComponentType
  registrar?: ComponentType
  anonymous?: ComponentType
  path: string
}

export const CustomRoute: FC<CustomRouteProps> = ({ notarius, registrar, anonymous, path }) => {
  const role = useRecoilValue(roleSelector);
  const isAuth = useRecoilValue(isAuthSelector);

  if (role === 'notarius' && notarius)
    return <Route path={ path } component={ notarius }/>;
  if (role === 'registrar' && registrar)
    return <Route path={ path } component={ registrar }/>;
  if (!isAuth && anonymous)
    return <Route path={ path } component={ anonymous }/>;

  return <Page403/>;
};


