import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

export const isAuth = (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) => {
  if (!ctx.session?.id) {
    ctx.status = 401;
    ctx.body = {
      message: 'Not authorized',
    };
    return false;
  }
  return true;
};
export const isAdmin = (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) => {
  if (!isAuth(ctx)) {
    return false;
  }
  if (!ctx.session?.role) {
    ctx.status = 403;
    ctx.body = {
      message: 'Forbidden',
    };
    return false;
  }
  return true;
};