import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { createErrorSchema } from "@/api/lib/create-error-schema";
import * as HttpStatusCodes from "@/api/lib/http-status-codes";
import { IdParamsSchema } from "@/api/lib/id-params";
import { oneOf } from "@/api/lib/one-of";
import {
  insertBooksSchema,
  patchBooksSchema,
  selectBooksSchema,
} from "@/db/schema";

const tags = ["Books"];

// Get all books
export const list = createRoute({
  tags: tags,
  path: "/books",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: z.array(selectBooksSchema),
        },
      },
      description: "List of books",
    },
  },
});

// Get one book by id
export const getOneById = createRoute({
  tags: tags,
  path: "/books/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: selectBooksSchema,
        },
      },
      description: "The requested book",
    },
    [HttpStatusCodes.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string(),
            })
            .openapi({
              example: {
                message: "The requested book was not found",
              },
            }),
        },
      },
      description: "The requested book was not found",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(IdParamsSchema),
        },
      },
      description: "Invalid ID error",
    },
  },
});

// Create a book
export const create = createRoute({
  tags: tags,
  path: "/books",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertBooksSchema,
        },
      },
      required: true,
      description: "The book to create",
    },
  },
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: selectBooksSchema,
        },
      },
      description: "The created book",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(insertBooksSchema),
        },
      },
      description: "The validation error(s)",
    },
  },
});

// Update a book
export const patchOneById = createRoute({
  tags: tags,
  path: "/books/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: patchBooksSchema,
        },
      },
      required: true,
      description: "The updates to apply to the book",
    },
  },
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: selectBooksSchema,
        },
      },
      description: "The updated book",
    },
    [HttpStatusCodes.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string(),
            })
            .openapi({
              example: {
                message: "The requested book was not found",
              },
            }),
        },
      },
      description: "The requested book was not found",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: {
            oneOf: oneOf([
              createErrorSchema(patchBooksSchema),
              createErrorSchema(IdParamsSchema),
            ]),
          },
        },
      },
      description: "The validation error(s)",
    },
  },
});

// Delete a book
export const deleteOneById = createRoute({
  tags: tags,
  path: "/books/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Book deleted successfully",
    },
    [HttpStatusCodes.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string(),
            })
            .openapi({
              example: {
                message: "The requested book was not found",
              },
            }),
        },
      },
      description: "The requested book was not found",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(IdParamsSchema),
        },
      },
      description: "Invalid ID error",
    },
  },
});

export type ListRoute = typeof list;
export type GetOneByIdRoute = typeof getOneById;
export type CreateRoute = typeof create;
export type PatchOneByIdRoute = typeof patchOneById;
export type DeleteOneByIdRoute = typeof deleteOneById;
