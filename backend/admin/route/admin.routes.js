import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/admin.middleware.js";
import { getAllUsers } from "../controller/getUsers.controller.js";
import { deleteUser } from "../controller/deleteUser.controller.js";
import { updateUserStatus } from "../controller/updateUser.controller.js";
import { getAllTasks } from "../task/getTask.controller.js";
import { deleteAnyTask } from "../task/deleteTask.controller.js";
import { getActivityLogs } from "../task/getActivityLog.controller.js";
import { getAnalytics } from "../analytics/getAnalytics.controller.js";

const adminRouter = express.Router();

adminRouter.use(protect);

adminRouter.use(adminOnly);

adminRouter.get("/users", getAllUsers);

adminRouter.delete("/users/:id", deleteUser);

adminRouter.patch("/users/:id/status", updateUserStatus);

adminRouter.get("/tasks", getAllTasks);

adminRouter.delete("/tasks/:id", deleteAnyTask);

adminRouter.get("/activity-logs", getActivityLogs);

adminRouter.get("/analytics", getAnalytics);

export default adminRouter;
