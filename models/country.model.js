import { DataTypes } from "sequelize";
import db from "../connection/dbConnection.js";

const Country = db.define(
  "country",
  {
    name_common: {
      type: DataTypes.STRING,
    },
    name_official: {
      type: DataTypes.STRING,
    },
    native_name: {
      type: DataTypes.JSON,
    },
    population: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    sub_region: {
      type: DataTypes.STRING,
    },
    alpha: {
      type: DataTypes.JSON,
    },
    capital: {
      type: DataTypes.JSON,
    },
    top_level_domain: {
      type: DataTypes.JSON,
    },
    currencies: {
      type: DataTypes.JSON,
    },
    language: {
      type: DataTypes.JSON,
    },
    borders: {
      type: DataTypes.JSON,
    },
    flag: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Country.sync();
export default Country;
