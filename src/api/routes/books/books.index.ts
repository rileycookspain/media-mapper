import { createRouter } from '@/api/lib/create-hono-app';
import * as handlers from '@/api/routes/books/books.handlers';
import * as routes from '@/api/routes/books/books.routes';

const router = createRouter()
    .openapi(routes.list, handlers.list)

export default router;