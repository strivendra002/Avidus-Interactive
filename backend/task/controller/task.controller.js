import { Task } from "../../model/task.model.js";
import { logActivity } from "../../utils/logActivity.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      userId: req.user.id,
    });

    await logActivity({
      userId: req.user.id,
      taskId: task._id,
      action: "TASK_CREATED",
      details: `Created task: ${task.title}`,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
