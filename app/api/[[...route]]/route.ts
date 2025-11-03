import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { HTTPException } from 'hono/http-exception';
import accounts from './accounts';

const app = new Hono().basePath('/api');

app.onError((error, ctx) => {
  if(error instanceof HTTPException) {
    return error.getResponse();
  }

  return ctx.json({ error: "內部錯誤" }, 500);
})

const routes = app
  .route('/accounts', accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
