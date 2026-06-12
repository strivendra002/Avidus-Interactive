import activityLogModel from "../../model/activityLog.model.js";

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await activityLogModel
      .find()
      .populate("userId", "name email")
      .populate("taskId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
