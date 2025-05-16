import { createRoute } from '@hono/zod-openapi';
import * as HttpStatusCodes from '@/api/lib/http-status-codes';
import { z } from 'zod';

const tags = ["Books"];

export const list = createRoute({
    tags: tags,
    path: "/tasks",
    method: "get",
    responses: {
        [HttpStatusCodes.OK]: {
            content: {
                'application/json': {
                    schema: z.array(z.object({
                        name: z.string(),
                        author: z.string(),
                    })),
                }
            },
            description: "List of books" 
        }
    }
})

export type ListRoute = typeof list;