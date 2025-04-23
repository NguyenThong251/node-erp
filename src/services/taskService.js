import Task from "../models/taskModel.js";

export const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

export const getTasks = async () => {
  return await Task.find();
};

export const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

export default { createTask, getTasks, getTaskById };
