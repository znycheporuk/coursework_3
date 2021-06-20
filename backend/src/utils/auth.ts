import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import crypto from 'crypto';
import { promisify } from 'util';


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


const pbkdf2 = (password: string, salt: string) => promisify(crypto.pbkdf2)(password, salt, 1e5, 32, 'sha512');

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(6).toString('base64');
  const hashBuffer = await pbkdf2(password, salt);
  const hash = hashBuffer.toString('hex');
  return { hash, salt };
};


export const isPasswordCorrect = async (passwordAttempt: string, hash: string, salt: string) => {
  const hashBuffer = await pbkdf2(passwordAttempt, salt);
  const hashAttempt = hashBuffer.toString('hex');
  return hash === hashAttempt;
};