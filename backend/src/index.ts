import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import json from 'koa-json';
import logger from 'koa-logger';
import session from 'koa-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import router from './routes/auth';
import notariesRouter from './routes/notaries';

const app = new Koa();
const port = process.env.PORT || 4000;

app.keys = [ 'key', 'key key' ];

app.use(helmet());
app.use(cors());
app.use(json());
app.use(logger());
app.use(bodyParser());

createConnection().then(()=>{
  console.log('DB connected')
})

const CONFIG = {
  key: 'key',
  maxAge: 3600000,
  rolling: true,
  renew: true,
  // secure: true,
};
app.use(session(CONFIG, app));

app.use(router.routes()).use(router.allowedMethods());
app.use(notariesRouter.routes()).use(notariesRouter.allowedMethods());

app.listen(port, () => {
  console.log(`App listening on the port ${ port }`);
});

