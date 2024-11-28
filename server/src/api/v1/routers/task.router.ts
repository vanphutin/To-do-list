import express, { Router } from "express";
const router: Router = express.Router();
import * as taskController from "../controller/task.controller";

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTasksDetail);
router.get("/change-status/:id", taskController.changeStatus);

export default router;
