import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: String,
    creator_id: Number,
    department_id: Number,
    project_id: Number,
    start_date: Date,
    due_date: Date,
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "On Hold", "Cancelled"],
      default: "Not Started",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    assignee_id: Number,
    details: {
      responsible_person_id: Number,
      due_date: Date,
      status: {
        type: String,
        enum: [
          "Not Started",
          "In Progress",
          "Completed",
          "On Hold",
          "Cancelled",
        ],
        default: "Not Started",
      },
      assigner_id: Number,
      description: String,
    },
    progress: {
      percentage: { type: Number, default: 0 },
      checklists: [
        {
          item: String,
          is_completed: { type: Boolean, default: false },
        },
      ],
    },
    sub_tasks: [
      {
        title: String,
        assignee_id: Number,
        status: {
          type: String,
          enum: ["Not Started", "In Progress", "Completed"],
          default: "Not Started",
        },
        due_date: Date,
      },
    ],
    files: [
      {
        file_name: String,
        file_path: String,
        uploaded_by: Number,
        uploaded_at: { type: Date, default: Date.now },
      },
    ],
    comments: [
      {
        user_id: Number,
        content: String,
        parent_comment_id: Schema.Types.ObjectId,
        created_at: { type: Date, default: Date.now },
        likes: [
          {
            user_id: Number,
            created_at: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Đảm bảo các trường bắt buộc bằng middleware
TaskSchema.pre("save", function (next) {
  if (!this.title) throw new Error("Title is required");
  if (!this.creator_id) throw new Error("Creator ID is required");
  if (!this.start_date) throw new Error("Start date is required");
  if (!this.due_date) throw new Error("Due date is required");
  if (!this.details.due_date) throw new Error("Details due date is required");
  next();
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
