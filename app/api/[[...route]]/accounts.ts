import { Hono } from 'hono';

const app = new Hono()
  .get('/', (cxt) => {
    return cxt.json({ accounts: [] });
  });

export default app;
