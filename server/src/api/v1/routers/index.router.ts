import taskRouter from "./task.router";
import { Express } from "express";
const version: string = "/api/v1"; // Using lowercase 'string' for type consistency
const mainRouter = (app: Express): void => {
  app.use(`${version}/tasks`, taskRouter); // Ensure the route is correctly prefixed
};

export default mainRouter;
