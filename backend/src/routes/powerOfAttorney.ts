import Router from 'koa-router';
import { IPowerOfAttorney } from '../lib/types';
import { PowerOfAttorneyController } from '../controllers/PowerOfAttorneyController';

const powerOfAttorneyRouter = new Router();

powerOfAttorneyRouter
  .post('/register-power-of-attorney', async (ctx, next) => {
    const PoA: IPowerOfAttorney = { ...ctx.request.body as any };
    const alreadyExists = await PowerOfAttorneyController.getBySerialNumber(PoA.series, PoA.number);

    if (alreadyExists) {
      ctx.status = 409;
      ctx.body = {
        message: 'Довіреність з таким серійним номером уже існує!',
      };
      return await next();
    }
    await PowerOfAttorneyController.create(PoA);
    ctx.status = 201;
    ctx.body = {
      message: 'Довіреність створено!',
    };
    await next();
  })
  .patch('/update-power-of-attorney', async (ctx, next) => {
    const updatePoA: IPowerOfAttorney = { ...ctx.request.body as any };
    await PowerOfAttorneyController.update(updatePoA);
    ctx.status = 201;
    ctx.body = {
      message: 'Довіреність оновлено!',
    };
    await next();
  })
  .get('/power-of-attorney', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = await PowerOfAttorneyController.getAll();
    await next();
  })
  .get('/power-of-attorney/:series/:number', async (ctx, next) => {
    const { series, number } = ctx.params;
    const PoA = await PowerOfAttorneyController.getBySerialNumber(series, Number(number));
    if (PoA) {
      ctx.body = PoA;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'Довіреності з таким серійним номером не існує!',
      };
    }
    await next();
  });

export default powerOfAttorneyRouter;
