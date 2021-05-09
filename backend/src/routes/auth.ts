import Router from 'koa-router';
import User from '../models/User';

const router = new Router();

router
  .post('/sign-in', async (ctx, next) => {
    const { firstName, lastName, password } = ctx.request.body;
    const user = await User.findOne({
      where: {
        firstName,
        lastName,
        password,
      },
    });
    if (user && ctx.session) {
      ctx.session.role = user.role;
      ctx.session.userId = user.id;
      ctx.body = {
        status: 'success',
        userId: user?.id,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        error: 'User not found!',
      };
    }
    await next();
  })
  .post('/sign-on', async (ctx, next) => {
    const { firstName, lastName, password } = ctx.request.body;
    if (!firstName || !lastName || !password) {
      ctx.status = 400;
      ctx.body = {
        error: 'Some properties are missing',
      };
      await next();
      return;
    }
    const user = await User.create({
      firstName,
      lastName,
      password,
      role: 'user',
    });
    if (ctx.session) {
      ctx.session.role = user.role;
      ctx.session.userId = user.id;
      ctx.body = {
        status: 'success',
        userId: user?.id,
      };
    }
    await next();
  })
  .post('/sign-out', async (ctx, next) => {
    ctx.session = null;
    ctx.body = {
      message: 'Logged out',
    };
    await next();
  });

export default router;