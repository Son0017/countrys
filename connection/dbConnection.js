import { Sequelize } from "sequelize";

const db = new Sequelize("country", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});
try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db;
