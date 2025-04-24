import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
} from "./taskController.js";

const router = express.Router();

// Yêu cầu xác thực cho tất cả các API task
router.use(authMiddleware);

// Chỉ Admin và Manager được tạo task
router.post("/", roleMiddleware(["Admin", "Manager"]), createTaskHandler);
// Tất cả vai trò có thể xem danh sách task
router.get("/", getTasksHandler);
// Tất cả vai trò có thể xem chi tiết task
router.get("/:id", getTaskByIdHandler);

export default router;
