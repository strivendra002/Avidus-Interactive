import { Task } from "../../model/task.model.js";
import { logActivity } from "../../utils/logActivity.js";

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const isOwner = task.userId.toString() === req.user.id;

    const isAdmin = req.user.role === "Admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await logActivity({
      userId: req.user.id,
      taskId: task._id,
      action: "TASK_DELETED",
      details: `Deleted task: ${task.title}`,
    });

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
