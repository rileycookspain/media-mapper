import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
});

export const selectBooksSchema = createSelectSchema(books);
export const insertBooksSchema = createInsertSchema(books, {
  title: (schema) => schema.min(1).max(500),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchBooksSchema = insertBooksSchema.partial();

// export const usersTable = pgTable('users_table', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   age: integer('age').notNull(),
//   email: text('email').notNull().unique(),
// });

// export const postsTable = pgTable('posts_table', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
