import Router from 'koa-router';
import { UsersController } from '../controllers/UserController';
import { User } from '../entity/User';

const router = new Router();


router.get('/', async (ctx, next) => {
  ctx.body = await UsersController.getAll();
  console.log('asd');
  ctx.status = 200;
  await next();
}).post('/create', async (ctx, next) => {
  ctx.body = await UsersController.create((ctx.request.body) as unknown as User);
  await next();
});

export default router;
