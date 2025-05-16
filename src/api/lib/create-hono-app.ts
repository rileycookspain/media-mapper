import { OpenAPIHono } from '@hono/zod-openapi';
import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { pinoLogger } from '@/api/middlewares/pino-logger';
import env from '@/env';
import serveEmojiFavicon from '@/api/middlewares/serve-emoji-favicon';
import type { AppBindings } from '@/api/lib/types';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            success: result.success,
            error: result.error,
          },
          422,
        );
      }
    }
  });
}

export default function createHonoApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon('📚'));
  app.use(pinoLogger());

  // Not Found handler
  app.notFound((c) => {
    return c.json({
      ok: false,
      message: `Not Found: ${c.req.path}`,
    }, 404);
  });

  // Error handler
  app.onError((err:Error, c:Context) => {
    const currentStatus = "status" in err
      ? err.status
      : c.newResponse(null).status;
    const statusCode = currentStatus !== 200
      ? (currentStatus as ContentfulStatusCode)
      : 500;
    const currentEnv = c.env?.NODE_ENV || env?.NODE_ENV;
    return c.json(
      {
        ok: false,
        message: err.message,

        stack: currentEnv === "production"
          ? undefined
          : err.stack,
      },
      statusCode,
    );
  });
  
  return app;
}