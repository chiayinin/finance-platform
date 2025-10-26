import { Hono } from 'hono';
import { db } from '@/db/drizzle';
import { accounts } from '@/db/schema';

const app = new Hono()
  .get('/', async (cxt) => {
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);

    return cxt.json({ data });
  });

export default app;
