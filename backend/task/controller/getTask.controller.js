import { Task } from "../../model/task.model.js";

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      message: "All Tasks fetched Successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
