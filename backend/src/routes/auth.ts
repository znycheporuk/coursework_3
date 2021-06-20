import Router from 'koa-router';
import { UsersController } from '../controllers/UserController';
import { hashPassword, isPasswordCorrect } from '../utils/auth';
import { SignInValues, SignUpValues } from '../lib/types';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

const router = new Router();


router
  .post('/sign-up', async (ctx, next) => {

    const { username, password, role }: SignUpValues = ctx.request.body as any;
    if (!ctx.session) {
      ctx.status = 500;
      ctx.body = {
        message: 'Проблемп з сервером',
      };
      return await next();
    }
    if (!username || !password || !role) {
      ctx.status = 400;
      ctx.body = {
        message: 'Обовʼязкове поле відсутнє',
      };
      return await next();
    }

    const { hash, salt } = await hashPassword(password);

    const user = await UsersController.create({ username, hash, salt, role });
    ctx.status = 201;
    ctx.session.role = user.role;
    ctx.session.userId = user.id;
    ctx.body = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    await next();
  })
  .post('/sign-in', async (ctx, next) => {
    const { username, password }: SignInValues = ctx.request.body as any;
    const user = await getRepository(User).findOne({
      username,
    });
    if (user && ctx.session) {
      if (await isPasswordCorrect(password, user?.hash, user?.salt)) {
        ctx.status = 200;
        ctx.session.role = user.role;
        ctx.session.userId = user.id;
        ctx.body = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          message: 'Невірний пароль!',
        };
      }
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'User not found!',
      };
    }
    await next();
  })
  .get('/sign-out', async (ctx, next) => {
    ctx.session = null;
    ctx.body = {
      message: 'Logged out',
    };
    await next();
  });
// .post('/register-registrar', async (ctx, next) => {
//   if (!(ctx.session?.role === 'admin')) {
//     ctx.status = 403;
//     ctx.body = {
//       message: 'У вас недостатньо прав доступу',
//     };
//     return await next();
//   }
//   const { IDN, name, person, reasonOfAbsence }: UserSignUpData = ctx.request.body;
//   if (!name || !person || !(IDN || reasonOfAbsence)) {
//     ctx.status = 400;
//     ctx.body = {
//       message: 'Обовʼязкове поле відсутнє',
//     };
//     return await next();
//   }
//
//   const user = await User.create({
//     name,
//     person,
//     IDN,
//     reasonOfAbsence,
//     role: 'user',
//   });
//
//   ctx.body = {
//     message: '',
//     userId: user?.id,
//   };
//   await next();
// })


export default router;
