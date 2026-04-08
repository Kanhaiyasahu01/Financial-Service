import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

export const createApp = () => {
  const app = express();

  const normalizeOrigin = (origin) => origin.replace(/\/$/, "");

  const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

  const allowedOriginSet = new Set(allowedOrigins);

  const corsOptions = {
    origin(origin, callback) {
      // Allow requests without origin (server-to-server, curl, health checks).
      if (!origin) {
        return callback(null, true);
      }

       const normalizedRequestOrigin = normalizeOrigin(origin);

      if (allowedOriginSet.has(normalizedRequestOrigin)) {
        return callback(null, true);
      }

      // Allow Vercel preview/prod domains for smoother frontend deployments.
      if (normalizedRequestOrigin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      if (allowedOriginSet.size === 0) {
        return callback(null, true);
      }

      // Reject silently so preflight does not become an application error.
      return callback(null, false);
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 204,
  };

  app.use(helmet());
  app.use(cors(corsOptions));
  app.options(/.*/, cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use("/api/v1", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
