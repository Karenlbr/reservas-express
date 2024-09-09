import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  SALT_ROUNDS: process.env.SALT_ROUNDS | 10,
};
