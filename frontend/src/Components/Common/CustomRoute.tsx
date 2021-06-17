import React, { ComponentType, FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Page403 } from './ErrorPages/403';
import { useRecoilValue } from 'recoil';
import { isAuthSelector, roleSelector } from '../../recoil/auth';

interface CustomRouteProps extends RouteProps {
  notarius?: ComponentType
  registrar?: ComponentType
  anonymous?: ComponentType
}

export const CustomRoute: FC<CustomRouteProps> = ({ notarius, registrar, anonymous }) => {
  const role = useRecoilValue(roleSelector);
  const isAuth = useRecoilValue(isAuthSelector);

  if (role === 'notarius' && notarius)
    return <Route component={ notarius }/>;
  if (role === 'registrar' && registrar)
    return <Route component={ registrar }/>;
  if (!isAuth && anonymous)
    return <Route component={ anonymous }/>;

  return <Page403/>;
};


