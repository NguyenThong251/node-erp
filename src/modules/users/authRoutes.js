import express from "express";

import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "./authController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", authMiddleware, logoutHandler);

export default router;
