import { eq } from "drizzle-orm";

import * as HttpStatusCodes from "@/api/lib/http-status-codes";
import type { HonoRouteHandler } from "@/api/lib/types";
import type {
  CreateRoute,
  DeleteOneByIdRoute,
  GetOneByIdRoute,
  ListRoute,
  PatchOneByIdRoute,
} from "@/api/routes/books/books.routes";
import { db } from "@/db";
import { books } from "@/db/schema";

export const list: HonoRouteHandler<ListRoute> = async (c) => {
  const books = await db.query.books.findMany();
  return c.json(books);
};

export const getOneById: HonoRouteHandler<GetOneByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const book = await db.query.books.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
  if (!book) {
    return c.json(
      {
        message: "The requested book was not found",
      },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.json(book, HttpStatusCodes.OK);
};

export const create: HonoRouteHandler<CreateRoute> = async (c) => {
  const book = c.req.valid("json");
  const [inserted] = await db.insert(books).values(book).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const patchOneById: HonoRouteHandler<PatchOneByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const [book] = await db
    .update(books)
    .set(updates)
    .where(eq(books.id, id))
    .returning();
  if (!book) {
    return c.json(
      {
        message: "The requested book was not found",
      },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.json(book, HttpStatusCodes.OK);
};

export const deleteOneById: HonoRouteHandler<DeleteOneByIdRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(books).where(eq(books.id, id)).returning();
  if (result.length === 0) {
    return c.json(
      {
        message: "The requested book was not found",
      },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
