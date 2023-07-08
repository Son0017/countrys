import { Sequelize } from "sequelize";

const db = new Sequelize(
  "postgres://son:oJ9u2O6MGMYWDUKgztUVzMuF6W3ysfGH@dpg-cikinih5rnuvtgplcjq0-a.oregon-postgres.render.com/countries_yfcx"
);
try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db;
