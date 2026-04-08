import { Router } from "express";
import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import recordRoutes from "./record.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance dashboard API is healthy",
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/records", recordRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
