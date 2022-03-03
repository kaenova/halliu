import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  logging: false,
});

export default db;
