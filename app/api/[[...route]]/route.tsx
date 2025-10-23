import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

const app = new Hono().basePath('/api');

app
  .get(
    '/hello',
    clerkMiddleware(),
    (ctx) => {
      const auth = getAuth(ctx);

      if(!auth?.userId) {
        return ctx.json({ error: "Unauthorzied" });
      }

      return ctx.json({
        message: 'Hello Next.js!',
        userID: auth.userId,
      });
  });

export const GET = handle(app);
export const POST = handle(app);
