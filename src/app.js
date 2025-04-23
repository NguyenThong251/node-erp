// const express = require("express");
// const taskRoutes = require("./routes/taskRoutes");
// const authRoutes = require("./routes/authRoutes");
// import job from "./config/cron.js";
// import cors from "cors";
// const app = express();

// job.start();
// app.use(express.json());
// app.use(
//   cors({
//     origin: "*", // Hoặc specify client's IP/port
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

// module.exports = app;
