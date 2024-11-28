import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv");
import mainRouter from "./api/v1/routers/index.router";
dotenv.config();
import * as database from "./config/database";
database.connect();

const PORT: number | string = process.env.PORT || 8081;
const app: Express = express();

mainRouter(app);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "It's working !" });
});

app.listen(PORT, (): void => {
  console.log(`App listen on port ${PORT}`);
});
