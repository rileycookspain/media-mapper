import createHonoApp from '@/api/lib/create-hono-app';
import configureOpenAPI from '@/api/lib/configure-open-api';
import index from '@/api/routes/index.route'
import books from '@/api/routes/books/books.index';

const app = createHonoApp()

const routes = [
  index,
  books,
];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;