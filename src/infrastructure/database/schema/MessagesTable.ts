import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { UsersTable } from "./UsersTable.js";

export const MessagesTable = pgTable("Messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
});
