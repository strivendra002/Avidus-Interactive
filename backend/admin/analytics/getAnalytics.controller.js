import { Task } from "../../model/task.model.js";
import { User } from "../../model/user.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const activeUsers = await User.countDocuments({
      status: "Active",
    });

    const inactiveUsers = await User.countDocuments({
      status: "Inactive",
    });

    res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalTasks,
        completedTasks,
        pendingTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
