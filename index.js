import express from "express";
import dotenv from "dotenv";

import countryRoute from "./routes/country.routes.js";
import adminRoute from "./routes/user.routes.js";

dotenv.config();
const app = express();
let port = process.env.PORT ? process.env.PORT : 8080;
app.use(express.json());

app.use("/country", countryRoute);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log("server is on");
});
