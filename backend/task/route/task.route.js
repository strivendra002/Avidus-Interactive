import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { createTask } from "../controller/task.controller.js";
import { getMyTasks } from "../controller/getTask.controller.js";
import { getTaskById } from "../controller/getTaskDetail.controller.js";
import { updateTask } from "../controller/updateTask.controller.js";
import { deleteTask } from "../controller/deleteTask.controller.js";

const taskRouter = express.Router();

taskRouter.use(protect);

taskRouter.post("/", createTask);

taskRouter.get("/", getMyTasks);

taskRouter.get("/:id", getTaskById);

taskRouter.patch("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);

export default taskRouter;
