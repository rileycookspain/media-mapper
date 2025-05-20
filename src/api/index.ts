import configureOpenAPI from "@/api/lib/configure-open-api";
import { createHonoApp } from "@/api/lib/create-hono-app";
import books from "@/api/routes/books/books.index";
import index from "@/api/routes/index.route";

const app = createHonoApp();

const routes = [index, books] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type HonoAppType = (typeof routes)[number];

export default app;
