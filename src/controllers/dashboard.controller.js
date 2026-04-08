import { DashboardService } from "../services/dashboard.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const dashboardService = new DashboardService();

export const getDashboardSummary = asyncHandler(async (_req, res) => {
  const summary = await dashboardService.getSummary();

  res.status(200).json({
    success: true,
    message: "Dashboard summary fetched successfully",
    data: summary,
  });
});
