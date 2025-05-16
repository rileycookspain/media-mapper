import { createRoute, z} from '@hono/zod-openapi';
import { createRouter } from '@/api/lib/create-hono-app';
import * as HttpStatusCodes from '@/api/lib/http-status-codes';

const router = createRouter()
    .openapi(createRoute({
        tags: ["Index"],
        method: "get",
        path: "/",
        responses: {
            // This could be cleaned up in a jsonContent helper
            [HttpStatusCodes.OK]: {
              content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                }
              },
              description: "Books API Index" 
            },
        }
    }),
    (c) => {
        return c.json({
            message: "Books API",
        }, HttpStatusCodes.OK);
    }
)

export default router;