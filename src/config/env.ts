import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

config();

export const env = cleanEnv(process.env, {
  DATABASE_HOST: str(),
  DATABASE_PORT: str(),
  DATABASE_NAME: str(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
});
