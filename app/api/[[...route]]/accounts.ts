import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { HTTPException } from 'hono/http-exception';
import { and, eq, inArray } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { accounts, insertAccountSchema } from '@/db/schema';
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import z from 'zod';

const app = new Hono()
  .get(
    '/',
    clerkMiddleware(),
    async (ctx) => {
      const auth = getAuth(ctx);

      if(!auth?.userId) {
        throw new HTTPException(401, {
          res: ctx.json({ error: "未經授權" }, 401),
        });
      }

      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));

      return ctx.json({ data });
    })
  .get(
    '/:id',
    zValidator('param', z.object({
      id: z.string().optional(),
    })),
    clerkMiddleware(),
    async (ctx) => {
      const auth = getAuth(ctx);
      const { id } = ctx.req.valid('param');

      if(!id) {
        return ctx.json({ error: "找不到此 ID" }, 400);
      }

      if(!auth?.userId) {
        return ctx.json({ error: "未經授權" }, 401);
      }

      const [data] = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
          ),
        );

      if(!data) {
        return ctx.json({ error: "找不到 404" }, 404);
      }

      return ctx.json({ data });
    },
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertAccountSchema.pick({
      name: true,
    })),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid('json');

      if(!auth?.userId) {
        return ctx.json({ error: "未經授權" }, 401);
      }

      const [data] = await db.insert(accounts).values({
        id: createId(),
        userId: auth.userId,
        ...values,
      }).returning();

      return ctx.json({ data });
    })
  .post(
    'bulk-delete',
    clerkMiddleware(), // 驗證使用者的身份，確保使用者已經登入了。
    zValidator(
      'json',
      z.object({
        ids: z.array(z.string()),
      }),
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid('json');

      if(!auth?.userId) {
        return ctx.json({ error: '未經授權' }, 401);
      }

      const data = await db
        .delete(accounts)
        .where( // 設定刪除條件
          and( // 多個條件都要成立
            eq(accounts.userId, auth.userId), // 「等於」條件
            inArray(accounts.id, values.ids) // a 的值在 b 陣列中
          )
        )
        .returning({
          id: accounts.id,
        });

      return ctx.json({ data });
    }
  );

export default app;
