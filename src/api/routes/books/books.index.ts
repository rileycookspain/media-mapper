import { createRouter } from "@/api/lib/create-hono-app";
import * as handlers from "@/api/routes/books/books.handlers";
import * as routes from "@/api/routes/books/books.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOneById, handlers.getOneById)
  .openapi(routes.create, handlers.create)
  .openapi(routes.patchOneById, handlers.patchOneById)
  .openapi(routes.deleteOneById, handlers.deleteOneById);

export default router;
