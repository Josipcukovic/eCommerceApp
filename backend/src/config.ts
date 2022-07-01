import dotenv from "dotenv";

dotenv.config();

function getEnvironmentVariable(environmentVariable: string): string {
  const requestedEnvironmentVariable = process.env[environmentVariable];
  if (!requestedEnvironmentVariable) throw new Error(`${environmentVariable} environment variable couldn't be found!`);

  return requestedEnvironmentVariable;
}

export const config = {
  MONGO_ATLAS_URI: getEnvironmentVariable("MONGO_ATLAS_URI"),
  PORT: getEnvironmentVariable("PORT"),
  TOKEN_SECRET_STRING: getEnvironmentVariable("TOKEN_SECRET_STRING"),
  COOKIE_NAME: getEnvironmentVariable("COOKIE_NAME"),
};
