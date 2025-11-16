import { Hono } from "hono";

const app = new Hono()
  .get(
    '/',
    async (ctx) => {
      return ctx.json({ summary: true });
    },

  );

  export default app;
