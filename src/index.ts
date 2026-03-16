import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./config/env.js";

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

  const result = await db.execute("SELECT 1");

  console.log(result);
};

main();
