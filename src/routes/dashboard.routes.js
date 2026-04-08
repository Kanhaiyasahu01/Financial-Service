import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";
import { ROLES } from "../constants/roles.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
  "/summary",
  authenticate,
  authorize(ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN),
  getDashboardSummary
);

export default router;
