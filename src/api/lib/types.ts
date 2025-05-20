import type { OpenAPIHono } from "@hono/zod-openapi";
import { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { Schema } from "hono";
import type { PinoLogger } from "hono-pino";

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type HonoAppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

// Use R as a flexible type parameter instead of hardcoding a specific route
export type HonoRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export type ZodSchema =
  | z.ZodUnion
  | z.AnyZodObject
  | z.ZodArray<z.AnyZodObject>;
