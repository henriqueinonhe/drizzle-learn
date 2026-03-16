import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./config/env.js";
import {
  UsersTable,
  type DbUserCreationData,
} from "./infrastructure/database/schema/UsersTable.js";

const main = async () => {
  const db = drizzle({
    connection: {
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT),
      database: env.DATABASE_NAME,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
    },
  });

  await db.execute("SELECT 1");

  // const userCreationData: DbUserCreationData = {
  //   name: "Dobbertons",
  //   age: 23,
  //   email: "henriqueinonhe@gmail.com",
  // };

  // await db.insert(UsersTable).values(userCreationData);

  const result = await db.select().from(UsersTable);

  console.log(result);

  await db.$client.end();
};

main();
