import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    action: {
      type: String,
      enum: ["LOGIN", "TASK_CREATED", "TASK_UPDATED", "TASK_DELETED"],
      required: true,
    },

    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ActivityLog", activityLogSchema);
