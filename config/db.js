import { Sequelize } from "sequelize";

export const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mariadb",
    dialectOptions: {
      max: 10,
      min: 0,
      connectTimeout: 30000,
    },
  }
);
