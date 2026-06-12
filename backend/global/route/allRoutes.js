import { Router } from "express";
import userRouter from "../../users/route/user.route.js";
import adminRouter from "../../admin/route/admin.routes.js";
import taskRouter from "../../task/route/task.route.js";

export const allRoutes = Router();

allRoutes.use("/auth", userRouter);

allRoutes.use("/admin", adminRouter);

allRoutes.use("/task", taskRouter);
