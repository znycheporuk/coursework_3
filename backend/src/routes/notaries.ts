import Router from 'koa-router';
import { hashPassword } from '../utils/auth';
import { INotarius, IRegisterNotarius } from '../lib/types';
import { NotariusController } from '../controllers/NotariusController';
import { UsersController } from '../controllers/UserController';

const notariesRouter = new Router();

notariesRouter
  .post('/register-notarius', async (ctx, next) => {
    const notarius: IRegisterNotarius = { ...ctx.request.body as any };
    const alreadyExists = await UsersController.getByName(notarius.username);
    if (alreadyExists) {
      ctx.status = 409;
      ctx.body = {
        message: 'Користувач з таким логіном уже існує!',
      };
      return await next();
    }

    const { hash, salt } = await hashPassword(notarius.password);
    await NotariusController.create({ ...notarius, hash, salt });
    ctx.status = 201;
    ctx.body = {
      message: 'Нотаріус створений!',
    };
    return await next();
  })
  .get('/notaries', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = await NotariusController.getAll();
    await next();
  })
  .patch('/notarius', async (ctx, next) => {
    const updateNotariusData: INotarius = { ...ctx.request.body as any };
    await NotariusController.update(updateNotariusData);
    ctx.status = 201;
    ctx.body = {
      message: 'Нотаріус оновлений',
    };
    await next();
  })
  .get('/notarius/:id', async (ctx, next) => {
    const { id } = ctx.params;
    const notarius = await NotariusController.getByID(id);
    if (notarius) {
      delete notarius.salt;
      delete notarius.hash;
      ctx.body = notarius;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'Нотаріус оновлений',
      };
    }
    await next();
  });

export default notariesRouter;
