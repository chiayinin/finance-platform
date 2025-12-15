import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { HTTPException } from 'hono/http-exception';
import summary from './summary';
import accounts from './accounts';
import categories from './categories';
import transactions from './transactions';

const app = new Hono().basePath('/api');

app.onError((error, ctx) => {
  if(error instanceof HTTPException) {
    return error.getResponse();
  }

  return ctx.json({ error: "內部錯誤" }, 500);
})

const routes = app
  .route('summary', summary)
  .route('/accounts', accounts)
  .route('/categories', categories)
  .route('/transactions', transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
