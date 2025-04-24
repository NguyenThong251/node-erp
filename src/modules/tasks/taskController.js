import { createTask, getTasks, getTaskById } from "./taskService.js";
export const createTaskHandler = async (req, res) => {
  try {
    const creatorId = parseInt(req.user.id, 16);
    const taskData = { ...req.body, creator_id: creatorId };
    const newTask = await createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

export const getTasksHandler = async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

export const getTaskByIdHandler = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

export default { createTaskHandler, getTasksHandler, getTaskByIdHandler };
