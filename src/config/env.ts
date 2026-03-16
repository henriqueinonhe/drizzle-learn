import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

config();

export const env = cleanEnv(process.env, {
  ENVIRONMENT: str({
    choices: ["Development", "Staging", "Production"],
  }),
  FIRST_ENV: str(),
  SECOND_ENV: str(),
});
