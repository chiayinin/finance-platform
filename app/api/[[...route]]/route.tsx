import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app
  .get('/hello', (ctx) => {
    return ctx.json({
      message: 'Hello Next.js!',
    });
  })
  .get('/hello/:test', (ctx) => {
    const test = ctx.req.param("test");
    console.log(ctx.req)

    return ctx.json({
      message: 'Hello World 222!',
      test: test,
    });
  });

export const GET = handle(app);
export const POST = handle(app);
