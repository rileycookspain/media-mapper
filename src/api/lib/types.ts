import type { PinoLogger } from 'hono-pino'
import type { OpenAPIHono } from '@hono/zod-openapi'
import { RouteConfig, RouteHandler } from '@hono/zod-openapi'

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export type HonoAppOpenAPI = OpenAPIHono<AppBindings>;

// Use R as a flexible type parameter instead of hardcoding a specific route
export type HonoRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;