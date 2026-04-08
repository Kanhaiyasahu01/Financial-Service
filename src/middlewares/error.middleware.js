import { ApiError } from "../utils/apiError.js";

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "test") {
    console.error("[ERROR]", {
      path: req.originalUrl,
      method: req.method,
      message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
