import { STRING } from "sequelize";
import db from "../connection/dbConnection.js";

const Admin = db.define("admin", {
  first_name: {
    type: STRING,
    allowNull: false,
  },
  last_name: {
    type: STRING,
    allowNull: false,
  },
  login: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  phoneNumber: STRING,
});

Admin.sync();
export default Admin;
