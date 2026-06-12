import activityLogModel from "../model/activityLog.model.js";

export const logActivity = async ({
  userId,
  action,
  taskId = null,
  details = "",
}) => {
  await activityLogModel.create({
    userId,
    action,
    taskId,
    details,
  });
};