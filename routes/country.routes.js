import express from "express";
import {
  func,
  getAll,
  getAlphaCode,
  getCountriesByRegion,
  getCountryByName,
  getOne,
  updateOneCountry,
} from "../controllers/country.controller.js";
import auth from "../middleware/auth.js";

const route = express.Router();

route.get("/all", getAll);
route.get("/code/:alpha", getAlphaCode);
route.get("/name/:name", getCountryByName);
route.get("/region/:region", getCountriesByRegion);
route.get("/atall", func);
route.get("/:id", getOne);

route.patch("/:id", auth, updateOneCountry);
export default route;
