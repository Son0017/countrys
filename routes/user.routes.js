import express from "express";
import { createAdmin, login } from "../controllers/admin.conteoller.js";

const route = express.Router();

route.post("/", createAdmin);
route.post("/login", login);

export default route;
