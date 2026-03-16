import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./config/env.js";
import {
  UsersTable,
  type DbUserCreationData,
} from "./infrastructure/database/schema/UsersTable.js";
import { eq } from "drizzle-orm";
import { MessagesTable } from "./infrastructure/database/schema/MessagesTable.js";

const main = async () => {
  const db = drizzle({
    connection: {
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT),
      database: env.DATABASE_NAME,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
    },
    logger: true,
  });

  await db.execute("SELECT 1");

  const userCreationData: DbUserCreationData = {
    name: "Dobbertons",
    age: 23,
    email: "henriqueinonhe@gmail.com",
  };

  await db.insert(UsersTable).values(userCreationData);

  const result = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, "henriqueinonhe@gmail.com"))
    .limit(1);

  console.log(result[0]);

  await db
    .update(UsersTable)
    .set({
      age: 34,
    })
    .where(eq(UsersTable.email, "henriqueinonhe@gmail.com"));

  const result2 = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, "henriqueinonhe@gmail.com"))
    .limit(1);

  await db.insert(MessagesTable).values({
    userId: result2[0]!.id,
    text: "Duba duba",
  });

  const other = await db
    .select()
    .from(UsersTable)
    .leftJoin(MessagesTable, eq(UsersTable.id, MessagesTable.userId))
    .where(eq(UsersTable.email, "henriqueinonhe@gmail.com"));

  console.log(other);

  console.log(result2[0]);

  await db
    .delete(UsersTable)
    .where(eq(UsersTable.email, "henriqueinonhe@gmail.com"));

  const result3 = await db.$count(UsersTable);

  console.log(result3);

  await db.$client.end();
};

main();
