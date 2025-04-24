import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import job from "./config/cron.js";
import { connectDB } from "./config/database.js";
import taskRoutes from "./modules/tasks/taskRoutes.js";
import authRoutes from "./modules/users/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

job.start();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
